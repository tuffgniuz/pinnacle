from fastapi import APIRouter, Depends

from pinnacle.core.services.security_topic_service import (
    SecurityTopicService,
    get_security_topic_service,
)

router = APIRouter()


@router.get("/security-topics")
async def get_all_inload_all(
    topic_service: SecurityTopicService = Depends(get_security_topic_service),
):
    return await topic_service.get_all_and_inload_all()
