import os
from typing import Literal
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
		medias = db.query(Media).filter(Media.refers_to_uuid == uuid).order_by(Media.created_at).all()
		
		return [media.uuid for media in medias]


	@staticmethod
	async def upload(
		db: db_dependency,
		brand_uuid: UUID,
		refers_to_uuid: UUID,
		file: UploadFile = File(...),
		type: Literal["pc", "mobile"] = "pc",
		media: Media | None = None
	):
		# WARNING: Potential attack with big files.
		contents = await file.read()

		if len(contents) > 4*1024*1024:
			raise HTTPException(
				status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
				detail="File size is too big. Limit is 4mb"
			)

		await file.seek(0)

		filename = uuid4()

		editing_media = media
		if not editing_media:
			editing_media = Media(
				uuid=uuid4(),
				brand_uuid=brand_uuid,
				refers_to_uuid=refers_to_uuid
			)

		if type == "pc":
			editing_media.uuid_pc     = filename
		else:
			editing_media.uuid_mobile = filename

		os.makedirs(configuration.media_files_params.media_path, exist_ok=True)
		path = configuration.media_files_params.media_path + str(filename)

		with open(path, "wb") as f:
			f.write(contents)

		if not media: db.add(editing_media)
		db.commit()
		db.refresh(editing_media)
		
		return {
			"uuid": editing_media.uuid,
		}
	