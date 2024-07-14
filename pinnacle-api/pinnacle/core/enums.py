from enum import Enum


class ProjectMethodology(Enum):
    SCRUM = "scrum"
    KANBAN = "kanban"


class ProjectSecurityLevel(Enum):
    LEVEL1 = "level1"
    LEVEL2 = "level2"
    LEVEL3 = "level3"


class IssuePriority(Enum):
    LOW = "low"
    HIGH = "high"
