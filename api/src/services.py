from typing import Sequence

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.auth.users import get_current_user
from src.core.dependencies.db import get_async_session
from src.core.models import Issue, State, User
from src.core.repositories.issue_repository import IssueRepository
from src.core.repositories.state_repository import StateRepository


class WorkflowService:

    def __init__(
        self,
        current_user: User = Depends(get_current_user),
        session: AsyncSession = Depends(get_async_session),
    ):
        self.current_user = current_user
        self.session = session


class IssueService:

    def __init__(self, session: AsyncSession = Depends(get_async_session)):
        self.session = session
        self.repository = IssueRepository(self.session)

    async def create(self, issue_data: dict) -> Issue:
        issue_state_id = issue_data["state_id"]
        issue_data["order"] = await self.get_next_order_value(issue_state_id)

        issue = Issue(**issue_data)

        return await self.repository.create(issue)

    async def get_by_id_or_none(self, id: str) -> Issue | None:
        issue = await self.repository.get(id)

        if not issue:
            raise ValueError(f"Issue with id ({id}) does not exist")

        return issue

    async def filter_by_state(self, state_id: str) -> Sequence[Issue]:
        return await self.repository.filter_by(state_id=state_id)

    async def update(self, issue_id: str, update_data: dict) -> Issue | None:
        issue = await self.get_by_id_or_none(issue_id)

        if not issue:
            raise ValueError("Issue not found")

        current_state_id = issue.state_id
        new_state_id = update_data.get("state_id", current_state_id)
        new_order = update_data.get("order")

        if new_state_id != current_state_id:
            issue.state_id = new_state_id
            await self.repository.update(issue, state_id=new_state_id)

            current_state_issues = await self.filter_by_state(current_state_id)
            current_state_issues = sorted(current_state_issues, key=lambda x: x.order)

            for index, current_issue in enumerate(current_state_issues):
                current_issue.order = index + 1
            await self.session.commit()

        if new_order is not None:
            issues = await self.filter_by_state(new_state_id)
            issues = sorted(issues, key=lambda x: x.order)

            issues = [i for i in issues if i.id != issue_id]
            issues.insert(new_order, issue)

            for index, target_issue in enumerate(issues):
                target_issue.order = index + 1
            await self.session.commit()

        return await self.repository.update(issue, **update_data)

    async def get_next_order_value(self, state_id: str) -> int:
        issue = await self.repository.get_first_for_state(state_id)

        if issue is None:
            return 1
        return issue.order + 1


class StateService:
    def __init__(self, session: AsyncSession = Depends(get_async_session)):
        self.session = session
        self.repository = StateRepository(self.session)

    async def create(self, state_data: dict) -> State:
        state = State(**state_data)
        return await self.repository.create(state)

    async def get_all(self) -> Sequence[State]:
        return await self.repository.get_all()
