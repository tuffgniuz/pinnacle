from fastapi import APIRouter, Depends

from pinnacle.core.services.board_service import BoardService, get_board_service

router = APIRouter()


@router.get("/boards/project_id/{project_id}")
async def get_boards_for_project_id(
    project_id: str, board_service: BoardService = Depends(get_board_service)
):
    return await board_service.get_boards_for_project_id(project_id)
