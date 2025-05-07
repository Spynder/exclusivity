from datetime import datetime, timezone, timedelta
from uuid import UUID
import jwt
from jwt import PyJWTError

from src.config import configuration

class JWTGenerator:
    def __init__(self,
                 access_lifespan: int,
                 refresh_lifespan: int,
                 secret_key: str
                 ) -> None:
        self._access_lifespan = access_lifespan
        self._refresh_lifespan = refresh_lifespan
        self.__secret_key = secret_key

    def generate_tokens(self, brand_uuid: UUID) -> dict[str, str]:
        common_payload = {
            "brand_uuid": str(brand_uuid),
            "exp": datetime.now(timezone.utc) + timedelta(minutes=self._access_lifespan)
        }

        access_jwt = jwt.encode(
            payload=common_payload | {
                "type": "Access",
                "exp": datetime.now(timezone.utc) + timedelta(minutes=self._access_lifespan)
            },
            key=self.__secret_key,
            algorithm="HS256"
        )

        refresh_jwt = jwt.encode(
            payload=common_payload | {
                "type": "Refresh",
                "exp": datetime.now(timezone.utc) + timedelta(minutes=self._refresh_lifespan)
            },
            key=self.__secret_key,
            algorithm="HS256"
        )

        return {"access": access_jwt, "refresh": refresh_jwt}

    def decode_token(self, token: str) -> dict:
        try:
            payload = jwt.decode(token,
                                 key=self.__secret_key,
                                 algorithms="HS256")
            return payload
        except PyJWTError:
            return None


JWTManager = JWTGenerator(
    access_lifespan=configuration.jwt_params.access_lifespan,
    refresh_lifespan=configuration.jwt_params.refresh_lifespan,
    secret_key=configuration.jwt_params.secret_key
)

