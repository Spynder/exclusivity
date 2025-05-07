from fastapi import APIRouter, HTTPException
from starlette import status

from src.models.responses import LoginResponse
from src.utils import PasswordManager, JWTManager
from src.models.dto import RegisterData
from src.database import Brand, db_dependency

register_router = APIRouter(
	prefix="/register"
)

@register_router.post("")
async def register(data: RegisterData, db: db_dependency):
	if data.password != data.confirm_password:
		raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Passwords do not match")
	if len(data.password) < 8:
		raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Password must be at least 8 characters long")
	
	brand = db.query(Brand).filter(Brand.email == data.email).first()
	if brand is not None:
		raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="User with this email already exists")
	
	brand = db.query(Brand).filter(Brand.brand_name == data.brand_name).first()
	if brand is not None:
		raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="User with this brand already exists")
	
	# Create user

	hashed_password = PasswordManager.hash_password(data.password)

	brand = Brand(
		email=data.email,
		hashed_password=hashed_password,
		brand_name=data.brand_name,
		telegram_id=data.telegram_id
	)
	db.add(brand)
	db.commit()
	db.refresh(brand)

	# Generate tokens
	tokens = JWTManager.generate_tokens(brand.uuid)
	return LoginResponse(
		access_token=tokens["access"],
		refresh_token=tokens["refresh"]
	)