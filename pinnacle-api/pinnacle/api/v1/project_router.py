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
