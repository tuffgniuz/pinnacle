from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from pinnacle.core.models import Project
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
        stmt = select(Project).where(Project.users.contains(user))
        result = await self.session.execute(stmt)
        return result.scalars().all()
