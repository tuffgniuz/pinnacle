from fastapi import APIRouter, Depends

from pinnacle.core.services.workflow_service import (
    WorkflowService,
    get_workflow_service,
)

router = APIRouter()


@router.get("/workflows/active/project-key/{project_key}")
async def get_active_workflow(
    project_key: str, service: WorkflowService = Depends(get_workflow_service)
):
    return await service.get_active_workflow(project_key)
