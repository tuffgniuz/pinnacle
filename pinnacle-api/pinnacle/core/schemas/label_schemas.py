from pydantic import BaseModel


class LabelCreateSchema(BaseModel):
    name: str
    description: str | None = None
    color: str | None = None


class LabelReadSchema(BaseModel):
    id: str
    name: str
    description: str | None = None
    color: str | None = None


class LabelUpdateSchema(BaseModel):
    name: str | None = None
    description: str | None = None
    color: str | None = None
