import asyncio
import uuid

from sqlalchemy.future import select

from pinnacle.core.dependencies.db import session_maker
from pinnacle.core.models import Color, Label

colors = [
    {"id": uuid.uuid4(), "name": "#f28482"},
    {"id": uuid.uuid4(), "name": "#84a59d"},
    {"id": uuid.uuid4(), "name": "#f5cac3"},
    {"id": uuid.uuid4(), "name": "#cdb4db"},
    {"id": uuid.uuid4(), "name": "#f6bd60"},
    {"id": uuid.uuid4(), "name": "#457b9d"},
]

labels = [
    {
        "id": uuid.uuid4(),
        "name": "user story",
        "description": "A feature description from the end user's perspective.",
        "color": "#7ca982",
    },
    {
        "id": uuid.uuid4(),
        "name": "bug",
        "description": "An error or flaw causing incorrect or unexpected software behavior.",
        "color": "#ef476f",
    },
    {
        "id": uuid.uuid4(),
        "name": "task",
        "description": "A specific piece of work to be completed.",
        "color": "#0077b6",
    },
    {
        "id": uuid.uuid4(),
        "name": "spike",
        "description": "Research or exploration task to investigate a solution or approach.",
        "color": "#ffd166",
    },
    {
        "id": uuid.uuid4(),
        "name": "technical debt",
        "description": "Work needed to refactor or improve existing code.",
        "color": "#073b4c",
    },
    {
        "id": uuid.uuid4(),
        "name": "chore",
        "description": "Routine maintenance or operational task without direct user value.",
        "color": "#118ab2",
    },
]


async def seed_colors_and_labels():
    async with session_maker() as session:
        # Seeding colors
        for color in colors:
            existing_color = await session.execute(
                select(Color).filter_by(name=color["name"])
            )
            if existing_color.scalars().first() is None:
                new_color = Color(id=color["id"], name=color["name"])
                session.add(new_color)

        # Seeding labels
        for label in labels:
            existing_label = await session.execute(
                select(Label).filter_by(name=label["name"])
            )
            if existing_label.scalars().first() is None:
                new_label = Label(
                    id=label["id"],
                    name=label["name"],
                    description=label["description"],
                    color=label["color"],
                )
                session.add(new_label)

        await session.commit()
        print("Seeding of colors and labels completed.")


if __name__ == "__main__":
    asyncio.run(seed_colors_and_labels())
