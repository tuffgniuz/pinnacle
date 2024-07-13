from sqlalchemy.ext.asyncio import AsyncSession

from src.core.models import Project
from src.core.repositories.generic import GenericRepository


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
