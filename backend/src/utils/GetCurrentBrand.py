from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from src.utils.JWTGenerator import JWTManager
from uuid import UUID

security = HTTPBearer(auto_error=False)

async def get_current_brand(credentials: HTTPAuthorizationCredentials = Depends(security)) -> UUID:
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No access token provided"
        )
        
    token = credentials.credentials
    try:
        payload = JWTManager.decode_token(token) 
        brand_uuid = payload.get("brand_uuid")
        if brand_uuid is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token payload"
            )
        
        return UUID(brand_uuid)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials"
        )
