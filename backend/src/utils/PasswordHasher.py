from passlib.context import CryptContext
from src.config import configuration

class PasswordHasher:
    def __init__(self, rounds: int = configuration.password_hash_params.rounds):
        self._pwd_context = CryptContext(
            schemes=["bcrypt"],
            default="bcrypt",
            bcrypt__rounds=rounds
        )

    def hash_password(self, password: str) -> str:
        return self._pwd_context.hash(password)

    def verify_password(self, password: str, hashed: str) -> bool:
        return self._pwd_context.verify(password, hashed)

PasswordManager = PasswordHasher(
    rounds=configuration.password_hash_params.rounds
)