from pydantic import BaseModel


class BoardCreateSchema(BaseModel):
    name: str
    description: str | None = None
    is_default: bool = False
    project_id: str
    workflow_id: str
