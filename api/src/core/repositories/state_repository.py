from typing import Sequence

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from src.core.models import State
from src.core.repositories.compositor import GenericRepositoryCompositor


class StateRepository:

    def __init__(self, session: AsyncSession):
        self.session = session
        self.generic_repository_compositor = GenericRepositoryCompositor(
            State, self.session
        )

    async def get_all_with_issues(self) -> Sequence[State]:
        stmt = select(State).options(selectinload(State.issues))
        result = await self.session.execute(stmt)
        return result.scalars().all()
