from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from src.settings import pg_settings

DB_URL = f"postgresql+asyncpg://{pg_settings.postgres_user}:{pg_settings.postgres_password}@{pg_settings.postgres_host}:{pg_settings.postgres_port}/{pg_settings.postgres_db}"

engine = create_async_engine(DB_URL)
session_maker = async_sessionmaker(engine, expire_on_commit=False)


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with session_maker() as session:
        yield session
