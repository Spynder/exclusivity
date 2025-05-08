from typing import List, Optional
from pydantic import BaseModel


class GoodsCreate(BaseModel):
	name: str
	description: str = ""
	sizes: List[str] = []
	price: float
	media_uuid: List[str] = []