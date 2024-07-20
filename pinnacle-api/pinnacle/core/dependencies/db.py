from typing import AsyncGenerator

from fastapi import Depends
from fastapi_users_db_sqlalchemy import SQLAlchemyUserDatabase
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from pinnacle.core.config.settings import pg_settings
from pinnacle.core.models import OAuthAccount, User

DB_URL = f"postgresql+asyncpg://{pg_settings.postgres_user}:{pg_settings.postgres_password}@{pg_settings.postgres_host}:{pg_settings.postgres_port}/{pg_settings.postgres_db}"

engine = create_async_engine(DB_URL, echo=True)
session_maker = async_sessionmaker(engine, expire_on_commit=False)


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with session_maker() as session:
        yield session


async def get_user_db(session: AsyncSession = Depends(get_async_session)):
    yield SQLAlchemyUserDatabase(session, User, OAuthAccount)
