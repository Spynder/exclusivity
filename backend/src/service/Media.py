import os
from uuid import UUID, uuid4
from starlette import status

from fastapi import File, HTTPException, UploadFile
from src.config import configuration
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

		if len(contents) > 4*1024*1024:
			raise HTTPException(
				status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
				detail="File size is too big. Limit is 4mb"
			)

		await file.seek(0)


		new_media = Media(
			uuid=uuid4(),
			brand_uuid=brand_uuid,
			refers_to_uuid=refers_to_uuid
		)
		
		os.makedirs(configuration.media_files_params.media_path, exist_ok=True)
		path = configuration.media_files_params.media_path + str(new_media.uuid)
		print("Saving to", path)

		with open(path, "wb") as f:
			f.write(contents)

		db.add(new_media)
		db.commit()
		db.refresh(new_media)
		
		return {
			"uuid": new_media.uuid,
		}