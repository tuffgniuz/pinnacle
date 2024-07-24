from fastapi import APIRouter, Depends

from pinnacle.core.services.label_service import LabelService, get_label_service

router = APIRouter()


@router.get("/labels/{id}")
async def get_label_by_id_or_404(
    id: str, service: LabelService = Depends(get_label_service)
):
    return await service.get_by_id_or_none(id)


@router.get("/labels")
async def get_all_labels(service: LabelService = Depends(get_label_service)):
    return await service.get_all()
