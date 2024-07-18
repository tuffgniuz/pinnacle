from datetime import UTC, datetime
from typing import Sequence

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from pinnacle.core.auth.users import get_current_user
from pinnacle.core.defaults import DEFAULT_STATES
from pinnacle.core.dependencies.db import get_async_session
from pinnacle.core.enums import ProjectMethodology
from pinnacle.core.models import Project, State, User, Workflow
from pinnacle.core.repositories.project import ProjectRepository
from pinnacle.core.repositories.state import StateRepository
from pinnacle.core.repositories.workflow import WorkflowRepository
from pinnacle.core.services.abstract_generic_service import AbstractGenericService
from pinnacle.utils.text import generate_project_name_key, generate_workflow_name


class ProjectService(AbstractGenericService):
    def __init__(
        self,
        current_user: User = Depends(get_current_user),
        session: AsyncSession = Depends(get_async_session),
    ):
        self.current_user = current_user
        self.session = session
        self.project_repository = ProjectRepository(self.session)
        self.workflow_repository = WorkflowRepository(self.session)
        self.state_repository = StateRepository(self.session)

    async def create(self, project_data: dict) -> Project:
        project_data["name_key"] = generate_project_name_key(project_data["name"])
        project = Project(**project_data)
        project.users.append(self.current_user)

        if project.methodology == ProjectMethodology.SCRUM:
            project.has_backlog = True

        new_project = self.project_repository.generics.save(project)
        await self.session.flush()
        await self.create_default_workflow_and_states(new_project)
        await self.session.refresh(new_project)
        await self.session.commit()

        return new_project

    async def get_by_id_or_none(self, project_id: str) -> Project | None:
        project = await self.project_repository.generics.find_by_id(project_id)

        if not project:
            self._raise_not_found_exception(f"Project with {project_id} not found")

        return project

    async def get_by_name_key_or_none(self, name_key: str) -> Project | None:
        project = await self.project_repository.generics.find_one_by(name_key=name_key)
        if not project:
            self._raise_not_found_exception(detail="Project not found")
        return project

    async def get_project_for_current_user_or_none(
        self, name_key: str
    ) -> Project | None:
        project = await self.get_by_name_key_or_none(name_key)

        if self.current_user not in project.users:  # type: ignore
            self._raise_not_found_exception()
        return project

    async def get_all_projects_for_current_user(self) -> Sequence[Project]:
        return await self.project_repository.generics.find_all_by(
            users=self.current_user
        )

    async def create_default_workflow_and_states(self, project: Project):
        default_workflow_name = generate_workflow_name(str(project.name_key))
        workflow = Workflow(
            name=default_workflow_name,
            start_date=datetime.now(UTC),
            is_active=True,
            project_id=project.id,
        )

        self.workflow_repository.generics.save(workflow)
        await self.session.flush()

        for state_name in DEFAULT_STATES:
            is_final_state = state_name == "Done"
            state = State(
                name=state_name, is_final_state=is_final_state, workflow_id=workflow.id
            )
            self.state_repository.generics.save(state)
        await self.session.flush()


def get_project_service(
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_async_session),
) -> ProjectService:
    return ProjectService(current_user=current_user, session=session)
