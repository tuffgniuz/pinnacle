import uuid

from pydantic import BaseModel


class IssueCreateSchema(BaseModel):
    description: str | None
    state_id: str


class IssueReadSchema(BaseModel):
    id: uuid.UUID
    order: int
    description: str


class IssueUpdateSchema(BaseModel):
    description: str | None
    order: int | None
    state_id: str | None


class StateCreateSchema(BaseModel):
    name: str


class StateReadSchema(BaseModel):
    id: uuid.UUID
    name: str
    issues: list[IssueReadSchema]
