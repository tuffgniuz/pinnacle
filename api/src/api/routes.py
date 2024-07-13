from fastapi import FastAPI

from src.api.v1.project_router import router as project_router
from src.core.auth.users import users
from src.core.schemas.user_schemas import UserCreate, UserRead


def include_routers(app: FastAPI):
    app.include_router(project_router, prefix="/api/v1", tags=["projects"])
    app.include_router(
        users.get_register_router(UserRead, UserCreate), prefix="/auth", tags=["auth"]
    )
