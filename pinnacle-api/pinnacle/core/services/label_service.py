from typing import Sequence

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from pinnacle.core.auth.users import get_current_user
from pinnacle.core.dependencies.db import get_async_session
from pinnacle.core.models import Label, User
from pinnacle.core.repositories.label import LabelRepository
from pinnacle.core.schemas.label_schemas import LabelCreateSchema
from pinnacle.core.services.abstract_generic_service import AbstractGenericService


class LabelService(AbstractGenericService):

    def __init__(
        self,
        current_user: User = Depends(get_current_user),
        session: AsyncSession = Depends(get_async_session),
    ):
        self.current_user = current_user
        self.session = session
        self.label_repo = LabelRepository(self.session)

    async def get_by_id_or_none(self, label_id: str) -> Label | None:
        label = await self.label_repo.generics.find_by_id(label_id)

        if not label:
            self._raise_not_found_exception("Label not found")

        return label

    async def get_all(self) -> Sequence[Label]:
        return await self.label_repo.generics.find_all()


def get_label_service(
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_async_session),
) -> LabelService:
    return LabelService(current_user=current_user, session=session)
