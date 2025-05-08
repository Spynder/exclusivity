from pydantic import BaseModel

class RegisterData(BaseModel):
    password: str
    confirm_password: str
    brand_name: str
    telegram_id: str

