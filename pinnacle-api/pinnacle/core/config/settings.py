from pathlib import Path

from pydantic_settings import BaseSettings


class OAuthSettings(BaseSettings):
    google_oauth_client_id: str
    google_oauth_client_secret: str
    github_oauth_client_id: str
    github_oauth_client_secret: str

    class Config:
        env_file = str(Path(__file__).resolve().parent.parent.parent.parent / ".env")


class PostgresSettings(BaseSettings):
    postgres_user: str
    postgres_password: str
    postgres_db: str
    postgres_host: str = "localhost"
    postgres_port: int = 5432

    class Config:
        env_file = str(Path(__file__).resolve().parent.parent.parent.parent / ".env")


oauth_settings = OAuthSettings()
pg_settings = PostgresSettings()
