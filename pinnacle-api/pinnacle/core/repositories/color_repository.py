from sqlalchemy.ext.asyncio import AsyncSession

from pinnacle.core.models import Color
from pinnacle.core.repositories.generic import GenericRepository


class ColorRepository:

    def __init__(self, session: AsyncSession):
        self.session = session
        self.generics: GenericRepository[Color] = GenericRepository(Color, self.session)
