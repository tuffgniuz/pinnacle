from pydantic import BaseModel


class StateCreateSchema(BaseModel):
    name: str | None = None
    workflow_id: str | None = None


class StateUpdateSchema(BaseModel):
    name: str | None = None
    limit: int | None = None
    description: str | None = None
    color_id: str | None = None
    is_final_state: bool | None = None
