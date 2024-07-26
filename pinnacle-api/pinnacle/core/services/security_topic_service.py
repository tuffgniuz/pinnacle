from typing import Sequence

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from pinnacle.core.auth.users import get_current_user
from pinnacle.core.dependencies.db import get_async_session
from pinnacle.core.models import SecurityTopic, User
from pinnacle.core.repositories.security_topic import SecurityTopicRepository


class SecurityTopicService:

    def __init__(
        self,
        current_user: User = Depends(get_current_user),
        session: AsyncSession = Depends(get_async_session),
    ):
        self.current_user = current_user
        self.session = session
        self.topic_repository = SecurityTopicRepository(self.session)

    async def get_all_and_inload_all(self) -> Sequence[SecurityTopic]:
        return await self.topic_repository.get_all_and_inload_all()


def get_security_topic_service(
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_async_session),
) -> SecurityTopicService:
    return SecurityTopicService(current_user=current_user, session=session)
