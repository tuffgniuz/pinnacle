from pydantic import BaseModel


class IssueCreateSchema(BaseModel):
    title: str
    project_id: str
    workflow_id: str | None
    state_id: str | None
