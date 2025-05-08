from typing import List
from uuid import UUID, uuid4
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from starlette import status
 
from src.models.responses import GoodsModel
from src.models.dto import GoodsCreate
from src.database import Goods, Media
from src.database import db_dependency
from src.utils import get_current_brand

goods_router = APIRouter(
	prefix="/goods"
)

@goods_router.get(
		"",
		response_model=List[GoodsModel]
)
async def get_goods(
	db: db_dependency
):
	brands = db.query(Goods).all()
	return [GoodsModel(
        uuid=brand.uuid,
        brand_uuid=brand.brand_uuid,
        name=brand.name,
        description=brand.description or "",
        sizes=brand.sizes,
        price=brand.price,
        images_uuid=brand.images_uuid
	) for brand in brands]

@goods_router.get(
		"/{uuid}",
		response_model=GoodsModel
)
async def get_goods_by_uuid(
	db: db_dependency,
	uuid: UUID
):
	good = db.query(Goods).where(Goods.uuid == uuid).first()

	if not good:
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Goods not found")

	return GoodsModel(
        uuid=good.uuid,
        brand_uuid=good.brand_uuid,
        name=good.name,
        description=good.description or "",
        sizes=good.sizes,
        price=good.price,
        images_uuid=good.images_uuid
	)


@goods_router.post("")
async def create_goods(
	goods_data: GoodsCreate,
	db: db_dependency,
	brand_uuid: UUID = Depends(get_current_brand)
):
	medias = db.query(Media).filter(Media.uuid.in_(goods_data.media_uuid)).all()

	if len(medias) != len(goods_data.media_uuid):
		raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, status="Not the owner of media")

	images_uuid = uuid4()

	brand = Goods(
		brand_uuid=brand_uuid,
		name=goods_data.name,
		description=goods_data.description,
		sizes=goods_data.sizes,
		price=goods_data.price,
		images_uuid=images_uuid,
	)

	for media in medias:
		media.refers_to_uuid = brand.images_uuid
	
	db.add(brand)
	db.commit()
	db.refresh(brand)
	
	return JSONResponse(status_code=status.HTTP_201_CREATED, content="Goods created successfully")

@goods_router.put("/{uuid}")
async def update_goods(
	goods_data: GoodsCreate,
	db: db_dependency,
	uuid: UUID,
	brand_uuid: UUID = Depends(get_current_brand)
):
	goods = db.query(Goods).filter(Goods.uuid == uuid).first()

	if not goods:
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Goods not found")

	if goods.brand_uuid != brand_uuid:
		raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, status="Not the owner of goods")
	
	medias = db.query(Media).filter(Media.uuid in goods_data.media_uuid).all()

	if len(medias) != len(goods_data.media_uuid):
		raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, status="Not the owner of media")

	for media in medias:
		media.refers_to_uuid = goods.images_uuid

	goods.name = goods_data.name
	goods.description = goods_data.description
	goods.sizes = goods_data.sizes
	goods.price = goods_data.price
	db.commit()
	
	return JSONResponse(status_code=status.HTTP_200_OK, content="Goods updated successfully")
