from typing import Optional
from pydantic import BaseModel
from uuid import UUID

class MediaResponse(BaseModel):
    uuid_pc: Optional[UUID]
    uuid_mobile: Optional[UUID]
