from typing import List, Optional
from pydantic import BaseModel


class GoodsCreate(BaseModel):
	name: str
	description: Optional[str] = ""
	sizes: List[str] = []
	price: float