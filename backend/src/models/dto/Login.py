from pydantic import BaseModel


class LoginData(BaseModel):
    brand_name: str
    password: str

