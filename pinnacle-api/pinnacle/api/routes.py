from fastapi import FastAPI

from pinnacle.api.v1.color_router import router as color_router
from pinnacle.api.v1.issue_router import router as issue_router
from pinnacle.api.v1.label_router import router as label_router
from pinnacle.api.v1.project_router import router as project_router
from pinnacle.api.v1.security_topic_router import router as security_topic_router
from pinnacle.api.v1.state_router import router as state_router
from pinnacle.api.v1.workflow_router import router as workflow_router
from pinnacle.core.auth.oauth_clients import github_oauth_client
from pinnacle.core.auth.users import auth_backend, users
from pinnacle.core.config.settings import jwt_settings
from pinnacle.core.schemas.user_schemas import UserCreate, UserRead, UserUpdate


def include_routers(app: FastAPI):
    app.include_router(project_router, prefix="/api/v1", tags=["projects"])
    app.include_router(workflow_router, prefix="/api/v1", tags=["workflows"])
    app.include_router(issue_router, prefix="/api/v1", tags=["issues"])
    app.include_router(state_router, prefix="/api/v1", tags=["states"])
    app.include_router(color_router, prefix="/api/v1", tags=["colors"])
    app.include_router(label_router, prefix="/api/v1", tags=["topics"])
    app.include_router(security_topic_router, prefix="/api/v1", tags=["labels"])
    # fastapi-users routes
    app.include_router(
        users.get_register_router(UserRead, UserCreate), prefix="/auth", tags=["auth"]
    )
    app.include_router(
        users.get_users_router(UserRead, UserUpdate), prefix="/users", tags=["users"]
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
