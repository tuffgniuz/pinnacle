from typing import Generic, Optional, Sequence, Type, TypeVar

from sqlalchemy import select, text
from sqlalchemy.ext.asyncio import AsyncSession

from pinnacle.core.models import User

T = TypeVar("T")


class GenericRepository(Generic[T]):
    """
    A generic repository class that provides basic CRUD operations for a given SQLAlchemy model.

    Attributes:
        model (Type[T]): The SQLAlchemy model class.
        session (AsyncSession): The SQLAlchemy asynchronous session.
    """

    def __init__(self, model: Type[T], session: AsyncSession):
        """
        Initializes the generic repository with the specified model and session.

        Args:
            model (Type[T]): The SQLAlchemy model class.
            session (AsyncSession): The SQLAlchemy asynchronous session.
        """
        self.model = model
        self.session = session

    def save(self, item: T) -> T:
        """
        Adds the given item to the session and returns it.

        Args:
            item (T): The item to be added to the session.

        Returns:
            T: The item that was added to the session.
        """
        self.session.add(item)
        return item

    async def find_by_id(self, item_id: str | None = None) -> T | None:
        """
        Finds an item by its ID.

        Args:
            item_id (str): The ID of the item to find.

        Returns:
            Optional[T]: The item with the given ID, or None if not found.
        """
        if item_id is None:
            return None
        return await self.session.get(self.model, item_id)

    async def find_all(self) -> Sequence[T]:
        """
        Finds all items of the model type.

        Returns:
            Sequence[T]: A list of all items of the model type.
        """
        result = await self.session.execute(select(self.model))
        return result.scalars().all()

    async def find_one_by(self, **kwargs) -> Optional[T]:
        """
        Finds one item matching the given criteria.

        Args:
            **kwargs: Criteria to filter by.

        Returns:
            Optional[T]: The first item matching the criteria, or None if not found.
        """
        stmt = select(self.model).filter_by(**kwargs)
        result = await self.session.execute(stmt)
        return result.scalars().first()

    async def find_all_by(self, **kwargs) -> Sequence[T]:
        """
        Finds all items matching the given criteria.

        Args:
            **kwargs: Criteria to filter by.

        Returns:
            Sequence[T]: A list of all items matching the criteria.
        """
        stmt = select(self.model).filter_by(**kwargs)
        result = await self.session.execute(stmt)
        return result.scalars().all()

    async def update(self, item: T, values: dict) -> Optional[T]:
        """
        Updates the given item with the specified values.

        Args:
            item (T): The item to update.
            values (dict): A dictionary of values to update the item with.

        Returns:
            Optional[T]: The updated item, or None if the update failed.
        """
        for key, value in values.items():
            setattr(item, key, value)
        return item

    async def delete(self, item: T) -> None:
        """
        Deletes the given item from the session.

        Args:
            item (T): The item to delete.
        """
        await self.session.delete(item)

    async def _find_user_by_ids(self, user_ids: list[str]) -> Sequence[User]:
        placeholders = ", ".join(f":id_{i}" for i in range(len(user_ids)))
        stmt = text(f'SELECT * FROM "user" WHERE id IN ({placeholders})')
        params = {f"id_{i}": str(user_id) for i, user_id in enumerate(user_ids)}
        result = await self.session.execute(stmt, params)
        return result.scalars().all()
