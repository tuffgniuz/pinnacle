from sqlalchemy.ext.asyncio import AsyncSession

from pinnacle.core.models import Issue
from pinnacle.core.repositories.generic import GenericRepository


class IssueRepository:

    def __init__(self, session: AsyncSession):
        self.session = session
        self.generics: GenericRepository[Issue] = GenericRepository(Issue, self.session)
