import logging
from typing import Sequence

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from pinnacle.core.auth.users import get_current_user
from pinnacle.core.dependencies.db import get_async_session
from pinnacle.core.models import Issue, User
from pinnacle.core.repositories.issue import IssueRepository
from pinnacle.core.services.abstract_generic_service import AbstractGenericService
from pinnacle.core.services.project_service import ProjectService
from pinnacle.core.services.state_service import StateService
from pinnacle.utils.text import generate_issue_key

logger = logging.getLogger(__name__)


class IssueService(AbstractGenericService):

    def __init__(
        self,
        current_user: User = Depends(get_current_user),
        session: AsyncSession = Depends(get_async_session),
    ):
        self.current_user = current_user
        self.session = session
        self.issue_repository = IssueRepository(self.session)
        self.state_service = StateService(self.current_user, self.session)
        self.project_service = ProjectService(self.current_user, self.session)

    async def create(
        self,
        issue_data: dict,
        project_id: str,
        workflow_id: str | None = None,
        state_id: str | None = None,
    ) -> Issue | None:
        project = await self.project_service.get_by_id_or_none(project_id)
        state = await self.state_service.get_state_by_id_or_none(state_id)

        if state_id and not state:
            logger.error(f"State with ID {state_id} not found")
            self._raise_not_found_exception(detail=f"State not found")

        if not project:
            logger.error(f"Project with ID {project_id} not found")
            self._raise_not_found_exception(detail=f"Project not found")

        highest_order = await self.issue_repository.get_highest_order(
            project_id, state_id
        )
        new_order_value = highest_order + 1.0

        issue_key = await generate_issue_key(self.session, project_id, project.name_key)  # type: ignore

        # Remove 'project_id' and 'state_id' from issue_data if they exist
        issue_data.pop("project_id", None)
        issue_data.pop("state_id", None)
        issue_data.pop("workflow_id", None)

        issue = Issue(
            issue_key=issue_key,
            project_id=project_id,
            state_id=state_id,
            workflow_id=workflow_id,
            order=new_order_value,
            **issue_data,
        )

        new_issue = self.issue_repository.generics.save(issue)

        await self.session.flush()
        await self.session.refresh(new_issue)
        await self.session.commit()

        logger.info(f"Issue {new_issue.issue_key} created successfully.")

        return new_issue

    async def get_by_id_or_none(self, id: str) -> Issue | None:
        issue = await self.issue_repository.get_one_and_inload_all(id)

        if not issue:
            self._raise_not_found_exception("Issue not found")

        return issue

    async def update(self, id: str, update_data: dict) -> Issue:
        issue = await self.get_by_id_or_none(id)

        updated_issue = await self.issue_repository.generics.update(issue, update_data)

        await self.session.flush()
        await self.session.refresh(updated_issue)
        await self.session.commit()

        return updated_issue

    async def get_issues_by_state(self, state_id: str) -> Sequence[Issue]:
        await self.state_service.get_state_by_id_or_none(state_id)

        return await self.issue_repository.generics.find_all_by(state_id=state_id)


def get_issue_service(
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_async_session),
) -> IssueService:
    return IssueService(current_user=current_user, session=session)
