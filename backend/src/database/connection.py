from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from src.database.schemas import Base
from typing import Annotated

from fastapi import Depends
from sqlalchemy.orm import Session

from src.config import configuration

engine = create_engine(configuration.db_params.build_url())

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
Base.metadata.create_all(bind=engine)

db_dependency = Annotated[Session, Depends(get_db)]
