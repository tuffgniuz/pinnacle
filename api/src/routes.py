from fastapi import APIRouter, Depends

from src.schemas import (
    IssueCreateSchema,
    IssueUpdateSchema,
    StateCreateSchema,
    StateReadSchema,
)
from src.services import IssueService, StateService

router = APIRouter()


@router.post("/states")
async def create_state(
    state_create_schema: StateCreateSchema,
    service: StateService = Depends(StateService),
):
    return await service.create(state_create_schema.model_dump())


@router.get("/states", response_model=list[StateReadSchema])
async def get_states(service: StateService = Depends(StateService)):
    return await service.get_all()


@router.post("/issues")
async def create_issue(
    issue_create_schema: IssueCreateSchema,
    service: IssueService = Depends(IssueService),
):
    return await service.create(issue_create_schema.model_dump())


@router.get("/issues/stateid={state_id}")
async def get_issues_by_state(
    state_id: str, service: IssueService = Depends(IssueService)
):
    return await service.filter_by_state(state_id)


@router.patch("/issues/{issue_id}")
async def update_issue(
    issue_id: str,
    issue_update_schema: IssueUpdateSchema,
    service: IssueService = Depends(IssueService),
):
    print(issue_update_schema)
    return await service.update(
        issue_id, issue_update_schema.model_dump(exclude_unset=True)
    )
