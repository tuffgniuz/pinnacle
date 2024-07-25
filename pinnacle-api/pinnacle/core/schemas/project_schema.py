from pydantic import BaseModel, Field

from pinnacle.core.enums import ProjectSecurityLevel
from pinnacle.core.schemas.user_schemas import UserRead


class ProjectCreateSchema(BaseModel):
    name: str = Field(..., max_length=100)
    description: str | None = Field(None, max_length=500)


class ProjectReadSchema(BaseModel):
    name: str
    name_key: str
    description: str | None
    has_backlog: bool
    security_level: ProjectSecurityLevel
    users: list[UserRead]
