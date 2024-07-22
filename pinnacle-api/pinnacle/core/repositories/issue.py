import logging

from sqlalchemy import desc, func, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from pinnacle.core.models import Issue
from pinnacle.core.repositories.generic import GenericRepository

logger = logging.getLogger(__name__)


class IssueRepository:

    def __init__(self, session: AsyncSession):
        self.session = session
        self.generics: GenericRepository[Issue] = GenericRepository(Issue, self.session)

    async def get_one_and_inload_all(self, id: str) -> Issue | None:
        stmt = (
            select(Issue)
            .options(
                selectinload(Issue.state),
                selectinload(Issue.labels),
                selectinload(Issue.assignees),
                selectinload(Issue.security_controls),
            )
            .filter_by(id=id)
        )
        result = await self.session.execute(stmt)
        return result.scalars().first()

    async def get_highest_order(
        self, project_id: str, state_id: str | None = None
    ) -> float:
        logger.info(
            f"Fetching highest order for project_id: {project_id} and state_id: {state_id}"
        )

        stmt = select(func.max(Issue.order)).filter(Issue.project_id == project_id)

        if state_id is None:
            stmt = stmt.filter(Issue.state_id.is_(None))
            logger.debug(
                f"Querying highest order for project backlog (project_id: {project_id})"
            )
        else:
            stmt = stmt.filter(Issue.state_id == state_id)
            logger.debug(
                f"Querying highest order for state (state_id: {state_id}) within project (project_id: {project_id})"
            )

        result = await self.session.execute(stmt)
        highest_order = result.scalar()

        if highest_order is None:
            logger.info(
                f"No existing issues found for project_id: {project_id} and state_id: {state_id}. Defaulting highest order to 0."
            )
            highest_order = 0
        else:
            logger.info(
                f"Highest order for project_id: {project_id} and state_id: {state_id} is {highest_order}"
            )

        return highest_order
