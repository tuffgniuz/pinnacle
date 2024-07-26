import asyncio

from seeder.colors import seed_colors
from seeder.labels import seed_labels


async def main():
    print("Start seeding process...")
    await seed_colors()
    await seed_labels()
    print("Seeding process completed.")


if __name__ == "__main__":
    asyncio.run(main())
