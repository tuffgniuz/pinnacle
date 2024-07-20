from fastapi import APIRouter, Depends

from pinnacle.core.schemas.project_schema import ProjectCreateSchema
from pinnacle.core.services.project_service import ProjectService, get_project_service

router = APIRouter()


@router.post("/projects")
async def create_project(
    data: ProjectCreateSchema,
    service: ProjectService = Depends(get_project_service),
):
    return await service.create(data.model_dump(exclude_unset=True))


@router.get("/projects")
async def get_all_projects(service: ProjectService = Depends(get_project_service)):
    return await service.get_all_projects_for_current_user()


@router.get("/projects/{name_key}")
async def get_project_by_name_key(
    name_key: str, service: ProjectService = Depends(get_project_service)
):
    return await service.get_by_name_key_or_none(name_key)


@router.get("/projects/active-workflow/{name_key}")
async def get_project_with_active_workflow(
    name_key: str, service: ProjectService = Depends(get_project_service)
):
    return await service.get_project_with_active_workflow(name_key)
