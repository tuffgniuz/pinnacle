import logging
import uuid

from fastapi import APIRouter, Depends, HTTPException

from pinnacle.core.schemas.issue_schemas import (
    IssueAddAssigneeSchema,
    IssueAddLabelSchema,
    IssueCreateSchema,
    IssueDeleteLabelSchema,
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


@router.get("/issues/{id}")
async def get_issue_by_id(id: str, service: IssueService = Depends(get_issue_service)):
    return await service.get_by_id_or_none(id)


@router.patch("/issues/{issue_id}/update/assignee")
async def add_assignee_to_issue(
    issue_id: str,
    request: IssueAddAssigneeSchema,
    service: IssueService = Depends(get_issue_service),
):
    return await service.add_assignee(request.user_id, issue_id)


@router.patch("/issues/{issue_id}/update/label")
async def add_label_to_issue(
    issue_id: str,
    schema: IssueAddLabelSchema,
    issue_service: IssueService = Depends(get_issue_service),
):
    return await issue_service.add_label(schema.label_id, issue_id)


@router.delete("/issues/{issue_id}/delete/label")
async def delete_label_from_issue(
    issue_id: str,
    schema: IssueDeleteLabelSchema,
    issue_service: IssueService = Depends(get_issue_service),
):
    return await issue_service.delete_label(schema, issue_id)


@router.patch("/issues/{id}")
async def update_issue(
    id: str,
    update_schema: IssueUpdateSchema,
    service: IssueService = Depends(get_issue_service),
):
    return await service.update(id, update_schema.model_dump(exclude_unset=True))


@router.delete("/issues/{id}")
async def delete_issue(id: str, service: IssueService = Depends(get_issue_service)):
    return await service.delete(id)
