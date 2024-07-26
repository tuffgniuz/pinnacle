import asyncio

from seeder.asvs_v4 import seed_asvs
from seeder.colors import seed_colors
from seeder.labels import seed_labels


async def main():
    print("Start seeding process...")
    await seed_colors()
    await seed_labels()
    await seed_asvs()
    print("Seeding process completed.")


if __name__ == "__main__":
    asyncio.run(main())
