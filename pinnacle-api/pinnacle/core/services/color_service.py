from typing import Sequence

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from pinnacle.core.auth.users import get_current_user
from pinnacle.core.dependencies.db import get_async_session
from pinnacle.core.models import Color, User
from pinnacle.core.repositories.color_repository import ColorRepository
from pinnacle.core.services.abstract_generic_service import AbstractGenericService


class ColorService(AbstractGenericService):

    def __init__(
        self,
        current_user: User = Depends(get_current_user),
        session: AsyncSession = Depends(get_async_session),
    ):
        self.current_user = current_user
        self.session = session
        self.color_repository = ColorRepository(self.session)

    async def get_by_id_or_none(self, id: str) -> Color | None:
        color = await self.color_repository.generics.find_by_id(id)

        if not color:
            self._raise_not_found_exception("Color not found")

        return color

    async def get_all(self) -> Sequence[Color]:
        return await self.color_repository.generics.find_all()


def get_color_service(
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_async_session),
) -> ColorService:
    return ColorService(current_user=current_user, session=session)
