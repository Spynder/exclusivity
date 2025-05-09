import datetime
from sqlalchemy import ARRAY, UUID, Boolean, Column, DateTime, ForeignKey, LargeBinary, Numeric, String
from sqlalchemy.orm import declarative_base, relationship
from uuid import uuid4

class TimestampMixin:
    created_at = Column(DateTime, nullable=False, default=datetime.datetime.now(datetime.timezone.utc))
    updated_at = Column(DateTime, nullable=False, default=datetime.datetime.now(datetime.timezone.utc), 
                        onupdate=datetime.datetime.now(datetime.timezone.utc))

Base = declarative_base(cls=TimestampMixin)


class Brand(Base):
	__tablename__ = "brands"

	uuid = Column(UUID, primary_key=True, index=True, default=uuid4)
	brand_name = Column(String, unique=True)
	hashed_password = Column(String)
	telegram_id = Column(String)
	brand_description = Column(String)
	social_links = Column(ARRAY(String))
	brand_logo_uuid = Column(UUID, index=True, default=uuid4)
	brand_banners_uuid = Column(UUID, index=True, default=uuid4)

	goods = relationship("Goods", back_populates="brand")


class Media(Base):
	__tablename__ = "media"

	uuid = Column(UUID, primary_key=True, index=True, default=uuid4)
	uuid_pc = Column(UUID, index=True)
	uuid_mobile = Column(UUID, index=True)
	brand_uuid = Column(UUID, ForeignKey("brands.uuid"))
	refers_to_uuid = Column(UUID, index=True)
	
	
class Goods(Base):
	__tablename__ = "goods"

	uuid = Column(UUID, primary_key=True, index=True, default=uuid4)
	brand_uuid = Column(UUID, ForeignKey("brands.uuid"))
	name = Column(String(100))
	description = Column(String(500))
	sizes = Column(ARRAY(String(20)))
	price = Column(Numeric(10, 2))
	images_uuid = Column(UUID, index=True, default=uuid4)

	brand = relationship("Brand", back_populates="goods")
	
	
	

