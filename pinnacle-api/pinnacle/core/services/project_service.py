import logging
from typing import Sequence

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from pinnacle.core.auth.users import get_current_user
from pinnacle.core.dependencies.db import get_async_session
from pinnacle.core.models import Project, User
from pinnacle.core.repositories.project import ProjectRepository
from pinnacle.core.repositories.state import StateRepository
from pinnacle.core.repositories.workflow import WorkflowRepository
from pinnacle.core.schemas.board_schemas import BoardCreateSchema
from pinnacle.core.schemas.project_schema import (
    ProjectCreateSchema,
    ProjectUpdateSchema,
)
from pinnacle.core.services.abstract_generic_service import AbstractGenericService
from pinnacle.utils.text import generate_project_name_key

logger = logging.getLogger(__name__)


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

    async def create(
        self,
        project_schema: ProjectCreateSchema,
    ) -> Project:
        # excludes the enable_defaults retrieved from the schema
        project_schema_dict = project_schema.model_dump(exclude={"enable_defaults"})
        project_schema_dict["name_key"] = generate_project_name_key(project_schema.name)

        project = Project(**project_schema_dict)
        project.users.append(self.current_user)
        new_project = self.project_repository.generics.save(project)

        await self.session.flush()

        # Create a default board if enabled by user
        if project_schema.enable_defaults:
            from pinnacle.core.services.board_service import BoardService

            board_service = BoardService(self.current_user, self.session)
            default_board_name = project_schema_dict["name_key"] + " DEV"

            board_schema = BoardCreateSchema(
                name=default_board_name,
                description="Default board",
                is_default=True,
                project_id="",
                workflow_id="",  # leave empty here but will be set inside BoardService.create
            )

            await board_service.create(str(new_project.id), board_schema)

        await self.session.refresh(new_project)
        await self.session.commit()

        return new_project

    async def get_by_id_or_none(self, project_id: str) -> Project | None:
        project = await self.project_repository.find_by_id(project_id)

        if not project:
            self._raise_not_found_exception(f"Project with {project_id} not found")

        logger.info("Project found")

        return project

    async def get_by_name_key_or_none(self, name_key: str) -> Project | None:
        project = await self.project_repository.find_by_name_key(name_key)
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
        return await self.project_repository.find_all_by_user(self.current_user)

    async def get_project_with_board(self, name_key: str) -> Project | None:
        return await self.project_repository.find_project_default_board(name_key)

    async def update(
        self, project_id: str, update_schema: ProjectUpdateSchema
    ) -> Project | None:
        project = await self.get_by_id_or_none(project_id)
        updated_project = await self.project_repository.generics.update(
            project, update_schema.model_dump(exclude_unset=True)
        )
        await self.session.commit()
        await self.session.refresh(updated_project)

        return project

    async def delete(self, project_id: str) -> None:
        project = await self.get_by_id_or_none(project_id)
        await self.project_repository.generics.delete(project)
        await self.session.commit()


def get_project_service(
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_async_session),
) -> ProjectService:
    return ProjectService(current_user=current_user, session=session)
