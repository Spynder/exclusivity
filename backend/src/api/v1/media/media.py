from uuid import UUID
from fastapi import APIRouter, Depends, File, HTTPException, Response, UploadFile
from fastapi.responses import JSONResponse
from starlette import status

from src.service import MediaService
from src.database import Media, Brand, db_dependency
from src.utils import get_current_brand
from fastapi.responses import FileResponse
from src.config import configuration

media_router = APIRouter(
	prefix="/media"
)

@media_router.get("/{uuid}")
async def get_media(
	db: db_dependency,
	uuid: UUID
):
	media = db.query(Media).filter(Media.uuid == uuid).first()
	
	if not media:
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Media not found")
	
	file_path = configuration.media_files_params.media_path + str(uuid)
	
	try:
		return FileResponse(file_path)
	except FileNotFoundError:
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Media not found")


@media_router.get("/referring/{uuid}")
async def get_referring(
	db: db_dependency,
	uuid: UUID
):
	return await MediaService.get_referring(db, uuid)


@media_router.post("/logo")
async def upload_logo(
	db: db_dependency,
	file: UploadFile = File(...),
	brand_uuid: UUID = Depends(get_current_brand)
):
	brand_logo_uuid = db.query(Brand).filter(Brand.uuid == brand_uuid).first().brand_logo_uuid

	amount = len(await MediaService.get_referring(db, brand_logo_uuid))
	print(amount)

	if amount >= 1:
		raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Profile image already exists")

	return await MediaService.upload(db, brand_uuid, brand_logo_uuid, file)


@media_router.post("/banner")
async def upload_banner(
	db: db_dependency,
	file: UploadFile = File(...),
	brand_uuid: UUID = Depends(get_current_brand)
):
	brand_banners_uuid = db.query(Brand).filter(Brand.uuid == brand_uuid).first().brand_banners_uuid

	amount = len(await MediaService.get_referring(db, brand_banners_uuid))

	if amount >= 4:
		raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Too many banners")

	return await MediaService.upload(db, brand_uuid, brand_banners_uuid, file)

@media_router.post("/image")
async def upload_image(
	db: db_dependency,
	file: UploadFile = File(...),
	brand_uuid: UUID = Depends(get_current_brand)
):
	return await MediaService.upload(db, brand_uuid, None, file)


@media_router.delete("/{uuid}")
async def delete_media(
	db: db_dependency,
	uuid: UUID,
	brand_uuid: UUID = Depends(get_current_brand)
):
	media = db.query(Media).filter(Media.uuid == uuid).first()
	if media.brand_uuid != brand_uuid:
		raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You are not the owner")
	
	db.delete(media)
	db.commit()
	
	return status.HTTP_202_ACCEPTED