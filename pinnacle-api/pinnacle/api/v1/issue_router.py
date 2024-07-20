import logging

from fastapi import APIRouter, Depends

from pinnacle.core.schemas.issue_schemas import (
    IssueAddAssigneeSchema,
    IssueCreateSchema,
    IssueUpdateSchema,
)
from pinnacle.core.services.issue_service import IssueService, get_issue_service

router = APIRouter()

logger = logging.getLogger(__name__)


@router.post("/issues")
async def create_issue(
    create_schema: IssueCreateSchema, service: IssueService = Depends(get_issue_service)
):
    issue_data = create_schema.model_dump(exclude_unset=True)
    state_id = create_schema.state_id
    project_id = create_schema.project_id
    workflow_id = create_schema.workflow_id
    return await service.create(issue_data, project_id, workflow_id, state_id)


@router.patch("/issues/{issue_id}/update/assignee")
async def add_assignee(
    issue_id: str,
    request: IssueAddAssigneeSchema,
    service: IssueService = Depends(get_issue_service),
):
    return await service.add_assignee(request.user_id, issue_id)


@router.get("/issues/{id}")
async def get_issue_by_id(id: str, service: IssueService = Depends(get_issue_service)):
    return await service.get_by_id_or_none(id)


@router.patch("/issues/{id}")
async def update_issue(
    id: str,
    update_schema: IssueUpdateSchema,
    service: IssueService = Depends(get_issue_service),
):
    return await service.update(id, update_schema.model_dump(exclude_unset=True))
