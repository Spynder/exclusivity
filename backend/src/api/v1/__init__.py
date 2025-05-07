from fastapi import APIRouter
from .login import login_router
from .register import register_router
from .brand import brand_router
from .goods import goods_router
from .media import media_router
api_router = APIRouter(prefix="/api/v1")

api_router.include_router(login_router, tags=["auth"]) 
api_router.include_router(register_router, tags=["auth"])
api_router.include_router(brand_router, tags=["profile"])
api_router.include_router(goods_router, tags=["goods"])
api_router.include_router(media_router, tags=["media"])