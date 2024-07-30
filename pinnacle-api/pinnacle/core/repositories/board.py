from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from pinnacle.core.models import Board, Workflow
from pinnacle.core.repositories.generic import GenericRepository


class BoardRepository:

    def __init__(self, session: AsyncSession):
        self.session = session
        self.generics: GenericRepository[Board] = GenericRepository(Board, self.session)


    async def get_one_and_inload_all(self, board_id: str) -> Board:
        stmt  = select(Board).options(selectinload(Workflow)).filter_by(id=board_id)
        result = await self.session.execute(stmt)
        return result.scalars().first()
