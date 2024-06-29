import uuid

from pydantic import BaseModel
from sqlalchemy import UUID


class StateCreateSchema(BaseModel):
    name: str


class StateReadSchema(BaseModel):
    id: uuid.UUID
    name: str


class IssueCreateSchema(BaseModel):
    description: str | None
    state_id: str
