from datetime import UTC, datetime

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from pinnacle.core.auth.users import get_current_user
from pinnacle.core.defaults import DEFAULT_STATES
from pinnacle.core.dependencies.db import get_async_session
from pinnacle.core.models import Board, Project, State, User, Workflow
from pinnacle.core.repositories.board import BoardRepository
from pinnacle.core.repositories.state import StateRepository
from pinnacle.core.schemas.board_schemas import BoardCreateSchema
from pinnacle.core.services.project_service import ProjectService
from pinnacle.core.services.workflow_service import WorkflowService
from pinnacle.utils.text import generate_workflow_name


class BoardService:

    def __init__(
        self,
        current_user: User = Depends(get_current_user),
        session: AsyncSession = Depends(get_async_session),
    ):
        self.current_user = current_user
        self.session = session
        self.board_repo = BoardRepository(self.session)
        self.state_repo = StateRepository(self.session)
        self.workflow_service = WorkflowService(self.current_user, self.session)
        self.project_service = ProjectService(self.current_user, self.session)

    async def create(self, project_id: str, board_schema: BoardCreateSchema) -> Board:
        # Creating a board will always create a new workflow with states
        project = await self.project_service.get_by_id_or_none(project_id)

        data = board_schema.model_dump()
        data = board_schema.model_dump(exclude={"project_id"})

        board = Board(project_id=project_id, **data)
        new_board = self.board_repo.generics.save(board)

        await self.session.flush()

        await self.__create_default_workflow_and_states(project, new_board)

        await self.session.commit()
        await self.session.refresh(new_board)

        return new_board

    async def get_by_id_or_none(self, board_id: str) -> Board | None:
        board = await self.board_repo.generics.find_by_id(board_id)

        if not board:
            raise ValueError("Board not found")

        return board

    async def __create_default_workflow_and_states(
        self, project: Project, board: Board
    ):
        default_workflow_name = generate_workflow_name(str(project.name_key))
        workflow_data = {
            "name": default_workflow_name,
            "start_date": datetime.now(UTC),
            "is_active": True,
            "project_id": project.id,
            "board_id": board.id,
        }

        workflow = await self.workflow_service.create(workflow_data, str(project.id))
        await self.session.flush()

        for state_data in DEFAULT_STATES:
            state_data["workflow_id"] = workflow.id
            if "is_final_state" not in state_data:
                state_data["is_final_state"] = False
            state = State(**state_data)
            self.state_repo.generics.save(state)
        await self.session.flush()
