from enum import Enum


class ProjectMethodology(Enum):
    SCRUM = "scrum"
    KANBAN = "kanban"


class IssuePriority(Enum):
    LOW = "low"
    HIGH = "high"
