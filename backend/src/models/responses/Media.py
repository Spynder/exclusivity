from pydantic import BaseModel
from uuid import UUID

class MediaResponse(BaseModel):
    uuid: UUID
    uuid_pc: UUID
    uuid_mobile: UUID
