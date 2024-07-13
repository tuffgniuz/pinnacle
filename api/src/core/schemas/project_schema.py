from pydantic import BaseModel, Field

from src.core.enums import ProjectMethodology


class ProjectCreateSchema(BaseModel):
    name: str = Field(..., max_length=100)
    description: str | None = Field(None, max_length=500)
    methodology: ProjectMethodology = ProjectMethodology.KANBAN
