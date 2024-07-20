from pydantic import BaseModel


class LabelReadSchema(BaseModel):
    id: str | None
    name: str | None
