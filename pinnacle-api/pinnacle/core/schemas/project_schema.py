from pydantic import BaseModel

from pinnacle.core.enums import ProjectSecurityLevel
from pinnacle.core.schemas.user_schemas import UserRead


class ProjectCreateSchema(BaseModel):
    name: str
    description: str | None = None
    enable_defaults: bool


class ProjectUpdateSchema(BaseModel):
    name: str | None = None
    description: str | None = None
    has_backlog: bool | None = None


class ProjectReadSchema(BaseModel):
    name: str
    name_key: str
    description: str | None
    has_backlog: bool
    security_level: ProjectSecurityLevel
    users: list[UserRead]
