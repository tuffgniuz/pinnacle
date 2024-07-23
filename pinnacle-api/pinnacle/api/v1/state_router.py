from fastapi import APIRouter, Depends

from pinnacle.core.schemas.state_schemas import StateCreateSchema, StateUpdateSchema
from pinnacle.core.services.state_service import StateService, get_state_service

router = APIRouter()


@router.post("/states")
async def create_state(
    create_schema: StateCreateSchema, service: StateService = Depends(get_state_service)
):
    return await service.create(create_schema.model_dump(exclude_unset=True))


@router.get("/states/{workflow_id}")
async def get_states_for_worklow(
    workflow_id: str, service: StateService = Depends(get_state_service)
):
    return await service.get_states_for_workflow(workflow_id)


@router.patch("/states/{id}")
async def update_state(
    id: str,
    update_schema: StateUpdateSchema,
    service: StateService = Depends(get_state_service),
):
    return await service.update(id, update_schema.model_dump(exclude_unset=True))


@router.delete("/states/{id}")
async def delete_state(
    id: str,
    service: StateService = Depends(get_state_service),
):
    return await service.delete(id)
