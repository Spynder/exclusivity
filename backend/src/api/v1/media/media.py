from typing import Literal
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


@media_router.post("/banner/{type}")
async def upload_banner(
	db: db_dependency,
	type: Literal["pc", "mobile"],
	file: UploadFile = File(...),
	brand_uuid: UUID = Depends(get_current_brand)
):
	if type not in ["pc", "mobile"]:
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

	brand_banners_uuid = db.query(Brand).filter(Brand.uuid == brand_uuid).first().brand_banners_uuid

	amount = len(await MediaService.get_referring(db, brand_banners_uuid))

	if amount >= 4:
		raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Too many banners")

	return await MediaService.upload(db, brand_uuid, brand_banners_uuid, file, type)

@media_router.put("/banner/{uuid}/{type}")
async def compliment_banner(
	db: db_dependency,
	uuid: UUID,
	type: Literal["pc", "mobile"],
	file: UploadFile = File(...),
	brand_uuid: UUID = Depends(get_current_brand)
):
	if type not in ["pc", "mobile"]:
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
	
	media = db.query(Media).filter(Media.uuid == uuid).first()
	if not media:
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Media not found")
	if media.brand_uuid != brand_uuid:
		raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You are not the owner")
	
	# override!!! TODO
	#if (type=="pc" and media.uuid_pc) or (type=="mobile" and media.uuid_mobile):
	#	raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Media already exists")

	brand_banners_uuid = db.query(Brand).filter(Brand.uuid == brand_uuid).first().brand_banners_uuid

	return await MediaService.upload(db, brand_uuid, brand_banners_uuid, file, type, media)


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
	if not media:
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Media not found")

	if media.brand_uuid != brand_uuid:
		raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You are not the owner")
	
	# delete image file from filesystem TODO

	db.delete(media)
	db.commit()
	
	return status.HTTP_202_ACCEPTED

@media_router.get("/{type}/{uuid}")
async def get_media_typed(
	db: db_dependency,
	type: Literal["pc", "mobile", "pc-only", "mobile-only"],
	uuid: UUID
):
	media = db.query(Media).filter(Media.uuid == uuid).first()
	if not media:
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Media not found")

	media_uuid = None
	if type=="pc":
		media_uuid = media.uuid_pc if media.uuid_pc else media.uuid_mobile
	if type=="pc-only":
		media_uuid = media.uuid_pc
	if type=="mobile":
		media_uuid = media.uuid_mobile if media.uuid_mobile else media.uuid_pc
	if type=="mobile-only":
		media_uuid = media.uuid_mobile

	if not media_uuid:
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Media not found")

	file_path = configuration.media_files_params.media_path + str(media_uuid)
	
	try:
		return FileResponse(file_path)
	except FileNotFoundError:
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Media not found")

@media_router.delete("/{type}/{uuid}")
async def delete_media_typed(
	db: db_dependency,
	type: Literal["pc", "mobile"],
	uuid: UUID,
	brand_uuid: UUID = Depends(get_current_brand)
):
	media = db.query(Media).filter(Media.uuid == uuid).first()

	media_uuid = media.uuid_pc if type=="pc" else media.uuid_mobile
	
	if not media_uuid:
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Media not found")
	if media.brand_uuid != brand_uuid:
		raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You are not the owner")

	if type=="pc":
		media.uuid_pc = None
	else:
		media.uuid_mobile = None
	
	if media.uuid_pc == media.uuid_mobile == None:
		db.delete(media)
	
	db.commit()
	
	return status.HTTP_202_ACCEPTED
