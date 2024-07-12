from typing import Generic, Sequence, Type, TypeVar

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

T = TypeVar("T")


class GenericRepositoryMixin(Generic[T]):

    def __init__(self, model: Type[T], session: AsyncSession):
        self.model = model
        self.session = session

    async def create(self, item: T) -> T:
        self.session.add(item)
        return item

    async def get(self, item_id: str) -> T | None:
        return await self.session.get(self.model, item_id)

    async def get_all(self) -> Sequence[T]:
        result = await self.session.execute(select(self.model))
        return result.scalars().all()

    async def update(self, item: T, values: dict) -> T | None:
        for key, value in values.items():
            setattr(item, key, value)
        return item

    async def delete(self, item: T) -> None:
        await self.session.delete(item)
