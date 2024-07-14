from datetime import datetime

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from pinnacle.core.models import Issue


def generate_project_name_key(project_name: str) -> str:
    words = project_name.split()

    if len(words) > 1:
        name_key = "".join(word[0].upper() for word in words)
    else:
        name_key = project_name[:3].upper()

    return name_key


def generate_workflow_name(
    project_name_key: str, number: int = 1, name: str = ""
) -> str:
    current_year = datetime.now().year % 100
    formatted_number = f"{number:02d}"

    if name:
        sanitized_name = "-".join(name.split())
    else:
        sanitized_name = f"{project_name_key}-{formatted_number}-{current_year}"

    return sanitized_name


async def generate_issue_key(
    session: AsyncSession, project_id: str, project_name_key: str
) -> str:
    count_stmt = select(func.count()).where(Issue.project_id == project_id)
    result = await session.execute(count_stmt)
    count = result.scalar()

    next_number = count + 1  # type: ignore

    issue_key = f"#{project_name_key}-{next_number}"
    return issue_key
