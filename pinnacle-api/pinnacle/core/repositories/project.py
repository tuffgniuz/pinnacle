from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from pinnacle.core.models import Project, State, Workflow
from pinnacle.core.repositories.generic import GenericRepository


class ProjectRepository:
    """
    Repository class for Project model, providing an interface for
    common database operations using the GenericRepository.

    Attributes:
        session (AsyncSession): The SQLAlchemy asynchronous session.
        generics (GenericRepository[Project]): The generic repository instance for Project model.
    """

    def __init__(self, session: AsyncSession):
        """
        Initializes the ProjectRepository with the given session.

        Args:
            session (AsyncSession): The SQLAlchemy asynchronous session.
        """
        self.session: AsyncSession = session
        self.generics: GenericRepository[Project] = GenericRepository(
            Project, self.session
        )

    async def find_all_by_user(self, user):
        """
        Finds all projects associated with the given user.

        Args:
            user (User): The user to find projects for.

        Returns:
            Sequence[Project]: A list of all projects associated with the user.
        """
        stmt = (
            select(Project)
            .options(selectinload(Project.users))
            .where(Project.users.contains(user))
        )
        result = await self.session.execute(stmt)
        return result.scalars().all()

    async def find_by_id(self, project_id: str) -> Project | None:
        """
        Finds a project by its ID with users eagerly loaded.

        Args:
            project_id (str): The ID of the project to find.

        Returns:
            Project | None: The project with the given ID, or None if not found.
        """
        stmt = (
            select(Project)
            .options(selectinload(Project.users))
            .filter_by(id=project_id)
        )
        result = await self.session.execute(stmt)
        return result.scalars().first()

    async def find_by_name_key(self, name_key: str) -> Project | None:
        """
        Finds a project by its name key with users eagerly loaded.

        Args:
            name_key (str): The name key of the project to find.

        Returns:
            Project | None: The project with the given name key, or None if not found.
        """
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
