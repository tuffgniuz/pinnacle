from typing import Sequence

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from pinnacle.core.models import SecuritySection, SecurityTopic
from pinnacle.core.repositories.generic import GenericRepository


class SecurityTopicRepository:

    def __init__(self, session: AsyncSession):
        self.session = session
        self.generics: GenericRepository[SecurityTopic] = GenericRepository(
            SecurityTopic, self.session
        )

    async def get_all_and_inload_all(self) -> Sequence[SecurityTopic]:
        stmt = select(SecurityTopic).options(
            selectinload(SecurityTopic.sections).selectinload(SecuritySection.controls)
        )
        result = await self.session.execute(stmt)
        return result.scalars().all()
