from pathlib import Path

from pydantic_settings import BaseSettings


class PostgresSettings(BaseSettings):
    postgres_user: str
    postgres_password: str
    postgres_db: str
    postgres_host: str = "localhost"
    postgres_port: int = 5432

    class Config:
        env_file = str(Path(__file__).resolve().parent.parent.parent.parent / ".env")


pg_settings = PostgresSettings()
