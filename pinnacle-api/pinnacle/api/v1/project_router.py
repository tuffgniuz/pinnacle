from fastapi import APIRouter, Depends

from pinnacle.core.schemas.project_schema import ProjectCreateSchema
from pinnacle.core.services.project_service import ProjectService, get_project_service

router = APIRouter()


@router.post(path="/project")
async def create_project(
    data: ProjectCreateSchema,
    service: ProjectService = Depends(get_project_service),
):
    return await service.create(data.model_dump(exclude_unset=True))
