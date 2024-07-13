from fastapi import APIRouter, Depends, HTTPException, status

from src.core.schemas.project_schema import ProjectCreateSchema
from src.core.services.project_service import ProjectService, get_project_service

router = APIRouter()


@router.post(path="/project")
async def create_project(
    data: ProjectCreateSchema,
    service: ProjectService = Depends(get_project_service),
):
    try:
        return await service.create(data.model_dump(exclude_unset=True))
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
