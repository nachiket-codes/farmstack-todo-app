from fastapi import APIRouter, HTTPException, status, Depends
from models import UserReq
from crud import create_user
from hashing import hash
from ..oauth2 import get_current_user

router = APIRouter(prefix = "/users", tags = ["Users"])

@router.post('/add')
async def add_user(user: UserReq = Depends(get_current_user)):
    res = await create_user(
        username = user.username,
        email = user.email,
        password = hash(user.password)
    )
    if not res:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Could not add user")
    return {"user_id": res}