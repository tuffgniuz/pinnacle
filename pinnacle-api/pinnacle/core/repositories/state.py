from sqlalchemy.ext.asyncio import AsyncSession

from pinnacle.core.models import State
from pinnacle.core.repositories.generic import GenericRepository


class StateRepository:

    def __init__(self, session: AsyncSession):
        self.session = session
        self.generics: GenericRepository[State] = GenericRepository(State, self.session)
