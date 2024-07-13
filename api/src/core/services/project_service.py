from datetime import UTC, datetime
from typing import Sequence

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.auth.users import get_current_user
from src.core.defaults import DEFAULT_STATES
from src.core.dependencies.db import get_async_session
from src.core.enums import ProjectMethodology
from src.core.models import Project, State, User, Workflow
from src.core.repositories.project_repository import ProjectRepository
from src.core.repositories.state_repository import StateRepository
from src.core.repositories.workflow_repository import WorkfowRepository
from src.utils.text import generate_project_name_key, generate_workflow_name


class ProjectService:

    def __init__(
        self,
        current_user: User = Depends(get_current_user),
        session: AsyncSession = Depends(get_async_session),
    ):
        self.current_user = current_user
        self.session = session
        self.repository = ProjectRepository(self.session)
        self.workflow_repository = WorkfowRepository(self.session)
        self.state_repository = StateRepository(self.session)

    async def create(self, project_data: dict) -> Project:
        project_data["name_key"] = generate_project_name_key(project_data["name"])

        project = Project(**project_data)
        project.users.append(self.current_user)

        if project.methodology == ProjectMethodology.SCRUM:
            project.has_backlog = True

        new_project = self.repository.generics.save(project)

        await self.session.commit()
        await self.session.refresh(new_project)
        await self.create_default_workflow_and_states(new_project)

        return new_project

    async def get_by_name_key_or_none(self, name_key: str) -> Project | None:
        project = await self.repository.generics.find_one_by(name_key=name_key)

        if not project:
            raise ValueError("Project not found")

        return project

    async def get_project_for_current_user_or_none(
        self, name_key: str
    ) -> Project | None:
        project = await self.get_by_name_key_or_none(name_key)

        if not project:
            raise ValueError("Project not found")

        if self.current_user not in project.users:
            raise ValueError("You don't have access to this project")

        return project

    async def get_all_projects_for_current_user(self) -> Sequence[Project]:
        return await self.repository.generics.find_all_by(users=self.current_user)

    async def create_default_workflow_and_states(self, project: Project):
        default_workflow_name = generate_workflow_name(str(project.name_key))
        workflow = Workflow(
            name=default_workflow_name,
            start_date=datetime.now(UTC),
            is_active=True,
            project_id=project.id,
        )
        self.workflow_repository.generic_repository_compositor.create(workflow)
        await self.session.commit()

        for state_name in DEFAULT_STATES:
            is_final_state = state_name == "Done"
            state = State(
                name=state_name, is_final_state=is_final_state, workflow_id=workflow.id
            )
            self.state_repository.generic_repository_compositor.create(state)
            await self.session.commit()


def get_project_service(
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_async_session),
):
    return ProjectService(current_user=current_user, session=session)
