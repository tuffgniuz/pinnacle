from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from pinnacle.core.models import Project, State, Workflow
from pinnacle.core.repositories.generic import GenericRepository


class ProjectRepository:
    def __init__(self, session: AsyncSession):
        self.session: AsyncSession = session
        self.generics: GenericRepository[Project] = GenericRepository(
            Project, self.session
        )

    async def find_all_by_user(self, user):
        stmt = (
            select(Project)
            .options(selectinload(Project.users))
            .where(Project.users.contains(user))
        )
        result = await self.session.execute(stmt)
        return result.scalars().all()

    async def find_by_id(self, project_id: str) -> Project | None:
        stmt = (
            select(Project)
            .options(selectinload(Project.users))
            .filter_by(id=project_id)
        )
        result = await self.session.execute(stmt)
        return result.scalars().first()

    async def find_by_name_key(self, name_key: str) -> Project | None:
        stmt = (
            select(Project)
            .options(selectinload(Project.users))
            .filter_by(name_key=name_key)
        )
        result = await self.session.execute(stmt)
        return result.scalars().first()

    async def find_project_with_active_workflow(self, name_key: str) -> Project | None:
        stmt = (
            select(Project)
            .options(
                selectinload(Project.workflows)
                .selectinload(Workflow.states)
                .selectinload(State.issues)
            )
            .join(Workflow, Workflow.project_id == Project.id)
            .filter(Project.name_key == name_key)
            .filter(Workflow.is_active == True)
        )
        result = await self.session.execute(stmt)
        return result.scalars().first()
