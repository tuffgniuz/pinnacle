from sqlalchemy import desc, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from pinnacle.core.models import Issue, Project, State, Workflow
from pinnacle.core.repositories.generic import GenericRepository


class ProjectRepository:
    def __init__(self, session: AsyncSession):
        self.session: AsyncSession = session
        self.generics: GenericRepository[Project] = GenericRepository(
            Project, self.session
        )

    async def find_all_by_user(self, user):
        stmt = (
            select(Project)
            .options(selectinload(Project.users))
            .where(Project.users.contains(user))
        )
        result = await self.session.execute(stmt)
        return result.scalars().all()

    async def find_by_id(self, project_id: str) -> Project | None:
        stmt = (
            select(Project)
            .options(selectinload(Project.users))
            .filter_by(id=project_id)
        )
        result = await self.session.execute(stmt)
        return result.scalars().first()

    async def find_by_name_key(self, name_key: str) -> Project | None:
        stmt = (
            select(Project)
            .options(selectinload(Project.users))
            .filter_by(name_key=name_key)
        )
        result = await self.session.execute(stmt)
        return result.scalars().first()

    async def find_project_with_active_workflow(self, name_key: str) -> Project | None:
        stmt = (
            select(Project)
            .options(
                selectinload(Project.workflows)
                .selectinload(Workflow.issues)
                .selectinload(Issue.assignees),
                selectinload(Project.workflows)
                .selectinload(Workflow.states)
                .selectinload(State.issues)
                .selectinload(Issue.assignees),
            )
            .filter(Project.name_key == name_key)
        )
        result = await self.session.execute(stmt)
        project = result.scalars().first()

        if project:
            # Filter out only the active workflows
            project.workflows = [wf for wf in project.workflows if wf.is_active]

            # Sort issues within states and directly within workflows if no state
            for workflow in project.workflows:
                # Sort issues within states
                for state in workflow.states:
                    state.issues.sort(key=lambda issue: issue.order, reverse=True)

                # Sort issues directly within workflow that do not belong to any state
                workflow_issues_no_state = [
                    issue for issue in workflow.issues if issue.state_id is None
                ]
                workflow_issues_no_state.sort(
                    key=lambda issue: issue.order, reverse=True
                )
                workflow.issues = workflow_issues_no_state + [
                    issue for state in workflow.states for issue in state.issues
                ]

        return project
