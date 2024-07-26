import uuid

from sqlalchemy import select
from tqdm.asyncio import tqdm

from pinnacle.core.dependencies.db import session_maker
from pinnacle.core.models import Color

colors = [
    {"id": uuid.uuid4(), "hex_code": "#f28482", "name": "Light Coral"},
    {"id": uuid.uuid4(), "hex_code": "#84a59d", "name": "Sage"},
    {"id": uuid.uuid4(), "hex_code": "#f5cac3", "name": "Peach Puff"},
    {"id": uuid.uuid4(), "hex_code": "#cdb4db", "name": "Thistle"},
    {"id": uuid.uuid4(), "hex_code": "#f6bd60", "name": "Mustard"},
    {"id": uuid.uuid4(), "hex_code": "#457b9d", "name": "Steel Blue"},
]


async def seed_colors():
    async with session_maker() as session:
        need_to_seed = False
        for color in tqdm(colors, desc="Seeding colors"):
            existing_color = await session.execute(
                select(Color).filter_by(hex_code=color["hex_code"])
            )
            if existing_color.scalars().first() is None:
                new_color = Color(
                    id=color["id"], hex_code=color["hex_code"], name=color["name"]
                )
                session.add(new_color)
                need_to_seed = True

        if need_to_seed:
            await session.commit()
            print("Seeding colors completed!")
        else:
            print("No need to seed colors. All colors already exist.")
