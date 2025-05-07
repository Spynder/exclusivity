from typing import List, Optional
from pydantic import BaseModel, EmailStr
from uuid import UUID

class GoodsModel(BaseModel):
	uuid: UUID
	brand_uuid: UUID
	name: str
	description: Optional[str] = ""
	sizes: List[str]
	price: float
	images_uuid: UUID