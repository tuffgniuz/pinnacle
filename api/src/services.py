from typing import Sequence

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from src.db import get_async_session
from src.models import Issue, State
from src.repositories import IssueRepository, StateRepository


class IssueService:

    def __init__(self, session: AsyncSession = Depends(get_async_session)):
        self.session = session
        self.repository = IssueRepository(self.session)

    async def create(self, issue_data: dict) -> Issue:
        issue_state_id = issue_data["state_id"]
        issue_data["order"] = await self.get_next_order_value(issue_state_id)

        issue = Issue(**issue_data)

        return await self.repository.create(issue)

    async def get_next_order_value(self, state_id: str) -> int:
        issue = await self.repository.get_first_for_state(state_id)

        if issue is None:
            return 1
        return issue.order + 1

    async def get_by_id_or_none(self, id: str) -> Issue | None:
        issue = await self.repository.get(id)

        if not issue:
            raise ValueError(f"Issue with id ({id}) does not exist")

        return issue

    async def filter_by_state(self, state_id: str) -> Sequence[Issue]:
        return await self.repository.filter_by(state_id=state_id)

    async def update(self, id: str, **kwargs) -> Issue | None:
        # handle updating the issue
        # probably will need to have a utility function that handles the sorting logic
        # this utility function wil then only be triggered if a change in order is detected
        # whether that be inside the same state or in a new state
        issue = await self.get_by_id_or_none(id)


class StateService:
    def __init__(self, session: AsyncSession = Depends(get_async_session)):
        self.session = session
        self.repository = StateRepository(self.session)

    async def create(self, state_data: dict) -> State:
        state = State(**state_data)
        return await self.repository.create(state)

    async def get_all(self) -> Sequence[State]:
        return await self.repository.get_all()
