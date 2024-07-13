from sqlalchemy.ext.asyncio import AsyncSession

from src.core.models import Workflow
from src.core.repositories.compositor import GenericRepositoryCompositor


class WorkfowRepository:

    def __init__(self, session: AsyncSession):
        self.session = session
        self.generic_repository_compositor = GenericRepositoryCompositor(
            Workflow, self.session
        )
