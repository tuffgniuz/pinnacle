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
        with open(json_file_path, "r") as file:
            data = json.load(file)

        for topic_data in tqdm(data, desc="Seeding Security Topics"):
            topic_id = topic_data["security_topic_id"]
            existing_topic = await session.execute(
                select(SecurityTopic).where(SecurityTopic.topic_id == topic_id)
            )
            existing_topic = existing_topic.scalars().first()

            if existing_topic:
                # Update existing topic with new application field
                existing_topic.application = topic_data.get("application")
                existing_topic.summary = topic_data.get("summary")
                await session.commit()
                topic = existing_topic
            else:
                # Create new topic
                topic = SecurityTopic(
                    id=uuid.uuid4(),
                    topic_id=topic_data["security_topic_id"],
                    name=topic_data["security_topic_name"],
                    summary=topic_data.get("summary"),
                    application=topic_data.get("application"),
                )
                session.add(topic)
                await session.flush()

            for section_data in tqdm(
                topic_data.get("security_sections", []),
                desc=f"Seeding Sections for Topic {topic.topic_id}",
            ):
                section_id = section_data["security_section_id"]
                existing_section = await session.execute(
                    select(SecuritySection).where(
                        SecuritySection.section_id == section_id
                    )
                )
                existing_section = existing_section.scalars().first()

                if existing_section:
                    existing_section.summary = section_data.get("summary")
                    await session.commit()
                    section = existing_section
                else:
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
                    control_id = control_data["control_id"]
                    existing_control = await session.execute(
                        select(SecurityControl).where(
                            SecurityControl.control_id == control_id
                        )
                    )
                    existing_control = existing_control.scalars().first()

                    if existing_control:
                        existing_control.description = control_data["description"]
                        await session.commit()
                    else:
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
