from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from starlette import status

from src.models.dto import BrandUpdate
from src.models.responses import BrandResponse, BrandModel, GoodsModel
from src.database import Goods, Brand, db_dependency
from src.utils import get_current_brand

brand_router = APIRouter(
	prefix="/brand"
)

async def get_goods_of_brand(
		db: db_dependency,
		brand_uuid: UUID,
):
	goods = db.query(Goods, Brand.brand_name).join(Brand, Brand.uuid == Goods.brand_uuid).where(Goods.brand_uuid == brand_uuid).all()
	return [GoodsModel(
        uuid=good.uuid,
        brand_uuid=good.brand_uuid,
		brand_name=brand_name,
        name=good.name,
        description=good.description or "",
        sizes=good.sizes,
        price=good.price,
        images_uuid=good.images_uuid
	) for good, brand_name in goods]


@brand_router.get("")
async def get_brand(
	db: db_dependency,
):
	brands = db.query(Brand).order_by(Brand.created_at).all()

	return [
		BrandResponse(
			brand=BrandModel(
				uuid=brand.uuid,
				brand_name=brand.brand_name,
				telegram_id=brand.telegram_id,
				brand_description=brand.brand_description,
				social_links=brand.social_links,
				brand_logo_uuid=brand.brand_logo_uuid,
				brand_banners_uuid=brand.brand_banners_uuid
			),
			goods=await get_goods_of_brand(db, brand.uuid)
		) for brand in brands]

@brand_router.get("/my")
async def get_my_brand(
	db: db_dependency,
	brand_uuid: UUID = Depends(get_current_brand)
):
	return await get_brand(db, brand_uuid)


@brand_router.get(
		"/{uuid}"
)
async def get_brand(
	db: db_dependency,
	uuid: UUID
):
	brand = db.query(Brand).filter(Brand.uuid == uuid).first()
	if brand is None:
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No brand with this id")
	
	brand_model = BrandModel(
		uuid=brand.uuid,
		brand_name=brand.brand_name,
		telegram_id=brand.telegram_id,
		brand_description=brand.brand_description,
		social_links=brand.social_links,
		brand_logo_uuid=brand.brand_logo_uuid,
		brand_banners_uuid=brand.brand_banners_uuid
	)

	return BrandResponse(
		brand=brand_model,
		goods=await get_goods_of_brand(db, uuid)
	)

@brand_router.put("/my")
async def update_brand(
	brand_update: BrandUpdate,
	db: db_dependency,
	brand_uuid: UUID = Depends(get_current_brand)
):
	brand = db.query(Brand).filter(Brand.uuid == brand_uuid).first()
	if brand is None:
		raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="No brand with this id")

	# Update only the fields that were provided
	if brand_update.brand_name is not None:
		brand.brand_name = brand_update.brand_name
	if brand_update.telegram_id is not None:
		brand.telegram_id = brand_update.telegram_id
	if brand_update.brand_description is not None:
		brand.brand_description = brand_update.brand_description
	if brand_update.social_links is not None:
		brand.social_links = brand_update.social_links

	db.commit()

	return JSONResponse(
		status_code=200,
		content={"message": "Brand updated successfully"}
	)

