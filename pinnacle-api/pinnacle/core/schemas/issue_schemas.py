from typing import Optional

from pydantic import BaseModel

from pinnacle.core.enums import IssuePriority


class IssueCreateSchema(BaseModel):
    title: str
    project_id: str
    workflow_id: str | None
    state_id: str | None


class IssueAddLabelSchema(BaseModel):
    label_id: str


class IssueAddAssigneeSchema(BaseModel):
    user_id: str


class IssueUpdateSchema(BaseModel):
    project_id: str | None = None
    title: str | None = None
    workflow_id: str | None = None
    state_id: str | None = None
    description: str | None = None
    effort: int | None = None
    priority: IssuePriority | None = None
    ready_for_development: bool | None = None
