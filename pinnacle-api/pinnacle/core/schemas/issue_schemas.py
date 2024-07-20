from pydantic import BaseModel

from pinnacle.core.enums import IssuePriority
from pinnacle.core.schemas.label_schemas import LabelReadSchema
from pinnacle.core.schemas.user_schemas import UserRead


class IssueCreateSchema(BaseModel):
    title: str
    project_id: str
    workflow_id: str | None
    state_id: str | None


class IssueAddAssigneeSchema(BaseModel):
    user_id: str


class IssueUpdateSchema(BaseModel):
    # title: str | None
    # workflow_id: str | None
    # state_id: str | None
    # description: str | None
    # effort: int | None
    # priority: IssuePriority | None
    # ready_for_development: bool
    # labels: list[str] | None
    assignees: list[str] | None
