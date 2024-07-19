from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from pinnacle.core.auth.users import get_current_user
from pinnacle.core.dependencies.db import get_async_session
from pinnacle.core.models import User, Workflow
from pinnacle.core.repositories.workflow import WorkflowRepository
from pinnacle.core.services.abstract_generic_service import AbstractGenericService
from pinnacle.core.services.project_service import ProjectService


class WorkflowService(AbstractGenericService):

    def __init__(
        self,
        current_user: User = Depends(get_current_user),
        session: AsyncSession = Depends(get_async_session),
    ):
        self.current_user = current_user
        self.session = session
        self.workflow_repository = WorkflowRepository(self.session)
        self.project_service = ProjectService(self.current_user, self.session)

    async def create(self, workflow_data: dict, project_id: str) -> Workflow:
        project = await self.project_service.get_by_id_or_none(project_id)

        if project:
            await self.workflow_repository.validate_kanban_worklow(project.id)  # type: ignore

        workflow_data["project_id"] = project.id  # type: ignore
        new_workflow = Workflow(**workflow_data)

        return await self.workflow_repository.generics.save(new_workflow)

    async def get_active_workflow(self, project_name_key: str) -> Workflow:
        project = await self.project_service.get_project_for_current_user_or_none(
            project_name_key
        )

        return await self.workflow_repository.find_active_workflow_with_states_and_issues(
            project.id  # type: ignore
        )


def get_workflow_service(
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_async_session),
):
    return WorkflowService(current_user, session)
