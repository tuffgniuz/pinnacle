import uuid

from sqlalchemy import select
from tqdm.asyncio import tqdm

from pinnacle.core.dependencies.db import session_maker
from pinnacle.core.models import Label

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


async def seed_labels():
    async with session_maker() as session:
        need_to_seed = False
        for label in tqdm(labels, desc="Seeding labels"):
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
                need_to_seed = True

        if need_to_seed:
            await session.commit()
            print("Seeding labels completed!")
        else:
            print("No need to seed labels. All labels already exist.")
