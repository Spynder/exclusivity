from typing import List, Optional
from pydantic import BaseModel


class BrandUpdate(BaseModel):
	brand_name: Optional[str] = None
	telegram_id: Optional[str] = None
	brand_description: Optional[str] = None
	social_links: Optional[List[str]] = None