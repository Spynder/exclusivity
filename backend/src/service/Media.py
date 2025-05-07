from uuid import UUID
from starlette import status

from fastapi import File, HTTPException, UploadFile
from src.database import Media, db_dependency

class MediaService:
	@staticmethod
	async def get_referring(
		db: db_dependency,
		uuid: UUID
	):
		medias = db.query(Media).filter(Media.refers_to_uuid == uuid).all()
		
		return [media.uuid for media in medias]


	@staticmethod
	async def upload(
		db: db_dependency,
		brand_uuid: UUID,
		refers_to_uuid: UUID,
		file: UploadFile = File(...)
	):
		contents = await file.read()
		
		new_media = Media(
			brand_uuid=brand_uuid,
			refers_to_uuid=refers_to_uuid,
			media_data=contents
		)
		
		db.add(new_media)
		db.commit()
		db.refresh(new_media)
		
		return {
			"uuid": new_media.uuid,
		}