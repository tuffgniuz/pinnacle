from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from pinnacle.core.enums import ProjectMethodology
from pinnacle.core.models import Project, State, Workflow
from pinnacle.core.repositories.generic import GenericRepository


class WorkflowRepository:

    def __init__(self, session: AsyncSession):
        self.session = session
        self.generics: GenericRepository[Workflow] = GenericRepository(
            Workflow, self.session
        )

    async def find_active_workflow_with_states_and_issues(
        self, project_id: str
    ) -> Workflow:
        stmt = (
            select(Workflow)
            .options(selectinload(Workflow.states).selectinload(State.issues))
            .filter_by(is_active=True, project_id=project_id)
        )
        result = await self.session.execute(stmt)
        return result.scalars().first()

    async def validate_kanban_worklow(self, project: Project) -> None:
        if project.methodology == ProjectMethodology.KANBAN:
            result = await self.session.execute(
                select(Workflow).filter(Workflow.project_id == project.id)
            )
            existing_workflow = result.scalars().first()

            if existing_workflow:
                raise ValueError("A Kanban project can only have one workflow.")
