from fastapi_users.schemas import BaseUser, BaseUserCreate, BaseUserUpdate
from pydantic import Field


class UserCreate(BaseUserCreate):
    fullname: str = Field(..., max_length=1000)


class UserRead(BaseUser):
    fullname: str


class UserUpdate(BaseUserUpdate):
    pass
