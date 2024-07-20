from sqlalchemy.ext.asyncio import AsyncSession

from pinnacle.core.models import User
from pinnacle.core.repositories.generic import GenericRepository


class UserRepository:

    def __init__(self, session: AsyncSession):
        self.session = session
        self.generics: GenericRepository[User] = GenericRepository(User, self.session)
