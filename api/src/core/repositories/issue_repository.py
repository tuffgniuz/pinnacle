from typing import Sequence

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.models import Issue


class IssueRepository:

    def __init__(self, session: AsyncSession):
        self.session = session

    async def create(self, issue: Issue) -> Issue:
        self.session.add(issue)
        await self.session.commit()
        await self.session.refresh(issue)
        return issue

    async def get(self, id: str) -> Issue | None:
        return await self.session.get(Issue, id)

    async def get_first_for_state(self, state_id: str) -> Issue:
        stmt = select(Issue).filter_by(state_id=state_id).order_by(Issue.order.desc())
        result = await self.session.execute(stmt)
        return result.scalars().first()

    async def filter_by(self, **kwargs) -> Sequence[Issue]:
        stmt = select(Issue).filter_by(**kwargs).order_by(Issue.order.desc())
        result = await self.session.execute(stmt)
        return result.scalars().all()

    async def update(self, issue: Issue, **kwargs) -> Issue | None:
        for key, value in kwargs.items():
            setattr(issue, key, value)

        await self.session.commit()
        await self.session.refresh(issue)

        return issue
