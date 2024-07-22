from typing import Optional

from pydantic import BaseModel

from pinnacle.core.enums import IssuePriority


class IssueCreateSchema(BaseModel):
    title: str
    project_id: str
    workflow_id: str | None
    state_id: str | None


class IssueAddAssigneeSchema(BaseModel):
    user_id: str


class IssueUpdateSchema(BaseModel):
    project_id: Optional[str] = None
    title: Optional[str] = None
    workflow_id: Optional[str] = None
    state_id: Optional[str] = None
    description: Optional[str] = None
    effort: Optional[int] = None
    priority: Optional[IssuePriority] = None
    ready_for_development: Optional[bool] = None
