from sqlalchemy.ext.asyncio import AsyncSession

from pinnacle.core.models import Label
from pinnacle.core.repositories.generic import GenericRepository


class LabelRepository:

    def __init__(self, session: AsyncSession):
        self.session = session
        self.generics: GenericRepository[Label] = GenericRepository(Label, self.session)
