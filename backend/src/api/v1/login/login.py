from fastapi import APIRouter, HTTPException
from starlette import status

from src.models.responses import LoginResponse
from src.utils import JWTManager
from src.models.dto import LoginData
from src.database import Brand, db_dependency
from src.utils import PasswordManager

login_router = APIRouter(
    prefix="/login"
)

@login_router.post("")
async def login(data: LoginData, db: db_dependency):
    brand = db.query(Brand).filter(Brand.email == data.email).first()
    if brand is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No user with this email")
    if not PasswordManager.verify_password(data.password, brand.hashed_password):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid password")
    
    # generate tokens
    tokens = JWTManager.generate_tokens(brand.uuid)
    return LoginResponse(
        access_token=tokens["access"],
        refresh_token=tokens["refresh"]
    )