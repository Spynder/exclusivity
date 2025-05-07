from pydantic import BaseModel, EmailStr

class RegisterData(BaseModel):
    email: EmailStr
    password: str
    confirm_password: str
    brand_name: str
    telegram_id: str

