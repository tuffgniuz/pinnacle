import json
import logging
import uuid

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from tqdm import tqdm

from pinnacle.core.dependencies.db import session_maker
from pinnacle.core.models import SecurityControl, SecuritySection, SecurityTopic

logger = logging.getLogger(__name__)


async def seed_asvs_data(session: AsyncSession, json_file_path: str):
    try:
        # Check if data already exists
        existing_topics = await session.execute(select(SecurityTopic))
        if existing_topics.scalars().first():
            logger.info("ASVS data already exists, skipping seeding.")
            return

        with open(json_file_path, "r") as file:
            data = json.load(file)

        for topic_data in tqdm(data, desc="Seeding Security Topics"):
            topic = SecurityTopic(
                id=uuid.uuid4(),
                topic_id=topic_data["security_topic_id"],
                name=topic_data["security_topic_name"],
                summary=topic_data.get("summary"),
            )
            session.add(topic)
            await session.flush()

            for section_data in tqdm(
                topic_data.get("security_sections", []),
                desc=f"Seeding Sections for Topic {topic.topic_id}",
            ):
                section = SecuritySection(
                    id=uuid.uuid4(),
                    section_id=section_data["security_section_id"],
                    name=section_data["security_section_name"],
                    summary=section_data.get("summary"),
                    topic_id=topic.id,
                )
                session.add(section)
                await session.flush()

                for control_data in tqdm(
                    section_data.get("security_controls", []),
                    desc=f"Seeding Controls for Section {section.section_id}",
                ):
                    control = SecurityControl(
                        id=uuid.uuid4(),
                        control_id=control_data["control_id"],
                        description=control_data["description"],
                        section_id=section.id,
                    )
                    session.add(control)
                    await session.flush()

        await session.commit()
        logger.info("ASVS data seeded successfully")

    except Exception as e:
        await session.rollback()
        logger.error(f"Error seeding ASVS data: {e}")
        raise e


async def seed_asvs():
    async with session_maker() as session:
        await seed_asvs_data(session, "/app/seeder/data/asvs_data.json")
