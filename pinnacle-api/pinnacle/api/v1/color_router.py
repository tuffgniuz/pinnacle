from fastapi import APIRouter, Depends

from pinnacle.core.services.color_service import ColorService, get_color_service

router = APIRouter()


@router.get("/colors/{id}")
async def get_color_by_id(id: str, service: ColorService = Depends(get_color_service)):
    return await service.get_by_id_or_none(id)


@router.get("/colors")
async def get_all_colors(service: ColorService = Depends(get_color_service)):
    return await service.get_all()
