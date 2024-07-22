import asyncio
import uuid

from pinnacle.core.dependencies.db import session_maker
from pinnacle.core.models import Color

# Colors to seed
colors = [
    {"id": uuid.uuid4(), "name": "#f28482"},
    {"id": uuid.uuid4(), "name": "#84a59d"},
    {"id": uuid.uuid4(), "name": "#f5cac3"},
    {"id": uuid.uuid4(), "name": "#cdb4db"},
    {"id": uuid.uuid4(), "name": "#f6bd60"},
    {"id": uuid.uuid4(), "name": "#457b9d"},
]


async def seed_colors():
    async with session_maker() as session:
        for color in colors:
            new_color = Color(id=color["id"], name=color["name"])
            session.add(new_color)
        await session.commit()
        print("Seeding completed.")


if __name__ == "__main__":
    asyncio.run(seed_colors())
