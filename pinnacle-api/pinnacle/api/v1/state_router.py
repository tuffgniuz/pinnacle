from fastapi import APIRouter, Depends

from pinnacle.core.services.state_service import StateService, get_state_service

router = APIRouter()


@router.get("/states/{workflow_id}")
async def get_states_for_worklow(
    workflow_id: str, service: StateService = Depends(get_state_service)
):
    return await service.get_states_for_workflow(workflow_id)
