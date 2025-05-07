from typing import List, Optional
from pydantic import BaseModel, EmailStr
from uuid import UUID
from src.models.responses.Goods import GoodsModel

class BrandModel(BaseModel):
	uuid: UUID
	email: EmailStr
	brand_name: str = ""
	telegram_id: str = ""
	brand_description: Optional[str] = ""
	social_links: Optional[List[str]] = []
	brand_logo_uuid: UUID
	brand_banners_uuid: UUID

class BrandResponse(BaseModel):
	brand: BrandModel
	goods: List[GoodsModel]