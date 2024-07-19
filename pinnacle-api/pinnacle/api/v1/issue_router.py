import logging

from fastapi import APIRouter, Depends

from pinnacle.core.schemas.issue_schemas import IssueCreateSchema
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
