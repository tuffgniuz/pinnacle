import uuid

import redis.asyncio
from fastapi import Depends, Request
from fastapi_users import BaseUserManager, FastAPIUsers, UUIDIDMixin
from fastapi_users.authentication import (
    AuthenticationBackend,
    BearerTransport,
    RedisStrategy,
)

from pinnacle.core.config.settings import jwt_settings
from pinnacle.core.dependencies.db import get_user_db
from pinnacle.core.models import User
from pinnacle.utils.logger import logger


class UserManager(UUIDIDMixin, BaseUserManager[User, uuid.UUID]):
    reset_password_token_secret = jwt_settings.jwt_secret
    verification_token_secret = jwt_settings.jwt_secret

    async def on_after_register(self, user: User, request: Request | None = None):
        logger.info(f"User with email {user.email} has successfully been registered")


async def get_user_manager(user_db=Depends(get_user_db)):
    yield UserManager(user_db)


bearer_transport = BearerTransport(tokenUrl="auth/jwt/login")

redis = redis.asyncio.from_url("redis://pinnacle-redis:6379", decode_responses=True)


def get_redis_strategy() -> RedisStrategy:
    return RedisStrategy(redis, lifetime_seconds=3600)


auth_backend = AuthenticationBackend(
    name="redis", transport=bearer_transport, get_strategy=get_redis_strategy
)

users = FastAPIUsers[User, uuid.UUID](get_user_manager, [auth_backend])

get_current_user = users.current_user()
