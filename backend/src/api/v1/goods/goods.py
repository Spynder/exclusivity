from typing import List
from uuid import UUID
from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from starlette import status
 
from src.models.responses import GoodsModel
from src.models.dto import GoodsCreate
from src.database import Goods
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
		"/{id}",
		response_model=List[GoodsModel]
)
async def get_goods_of_brand(
	db: db_dependency,
	id: UUID
):
	brands = db.query(Goods).where(Goods.brand_uuid == id).all()
	return [GoodsModel(
        uuid=brand.uuid,
        brand_uuid=brand.brand_uuid,
        name=brand.name,
        description=brand.description or "",
        sizes=brand.sizes,
        price=brand.price,
        images_uuid=brand.images_uuid
	) for brand in brands]


@goods_router.post("")
async def create_goods(
	goods_data: GoodsCreate,
	db: db_dependency,
	brand_uuid: UUID = Depends(get_current_brand)
):
	brand = Goods(
		brand_uuid=brand_uuid,
		name=goods_data.name,
		description=goods_data.description,
		sizes=goods_data.sizes,
		price=goods_data.price
	)
	
	db.add(brand)
	db.commit()
	db.refresh(brand)
	
	return JSONResponse(status_code=status.HTTP_201_CREATED, content="Goods created successfully")
