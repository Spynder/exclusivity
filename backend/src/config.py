from dataclasses import dataclass, field
from dotenv import load_dotenv
from pathlib import Path
import os

load_dotenv(dotenv_path=
	Path().cwd() / ".env"
)

@dataclass(frozen=True)
class PasswordHashParams:
	rounds: int = 12

@dataclass(frozen=True)
class JwtTokenParams:
	access_lifespan = 120 # минут
	refresh_lifespan = 300 # минут
	secret_key = os.environ.get("JWT_SECRET_KEY")

@dataclass(frozen=True)
class DatabaseParams:
    username: str = os.environ.get("POSTGRES_USER")
    password: str = os.environ.get("POSTGRES_PASSWORD")
    host: str = "postgres-db"
    port: int = 5432
    database_name: str = os.environ.get("POSTGRES_DB")
    driver: str = "postgresql"

    def build_url(self) -> str:
        return f"{self.driver}://{self.username}:{self.password}@{self.host}:{self.port}/{self.database_name}"
	 
@dataclass(frozen=True)
class MediaFilesParams:
	media_path = "/app/media/"

@dataclass(frozen=True)
class TelegramParams:
	token: str = os.environ.get("TELEGRAM_BOT_TOKEN")
	admin_id: str = os.environ.get("TELEGRAM_ADMIN_ID")

@dataclass(frozen=True)
class Configuration:
	db_params: DatabaseParams = field(default_factory=DatabaseParams)
	jwt_params: JwtTokenParams = field(default_factory=JwtTokenParams)
	password_hash_params: PasswordHashParams = field(default_factory=PasswordHashParams)
	media_files_params: MediaFilesParams = field(default_factory=MediaFilesParams)
	telegram_params: TelegramParams = field(default_factory=TelegramParams)


configuration = Configuration()