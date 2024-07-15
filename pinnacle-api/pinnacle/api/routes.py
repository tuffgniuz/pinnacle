from fastapi import FastAPI

from pinnacle.api.v1.project_router import router as project_router
from pinnacle.core.auth.oauth_clients import github_oauth_client
from pinnacle.core.auth.users import auth_backend, users
from pinnacle.core.config.settings import jwt_settings
from pinnacle.core.schemas.user_schemas import UserCreate, UserRead


def include_routers(app: FastAPI):
    app.include_router(project_router, prefix="/api/v1", tags=["projects"])
    app.include_router(
        users.get_register_router(UserRead, UserCreate), prefix="/auth", tags=["auth"]
    )
    app.include_router(
        users.get_auth_router(auth_backend), prefix="/auth/jwt", tags=["auth"]
    )
    app.include_router(
        users.get_oauth_router(
            github_oauth_client, auth_backend, jwt_settings.jwt_secret
        ),
        prefix="/auth/github",
        tags=["auth"],
    )
