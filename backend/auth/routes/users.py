from fastapi import APIRouter, HTTPException, status, Depends
from models import UserReq
from crud import create_user, get_user
from hashing import hash
from ..oauth2 import get_current_user

router = APIRouter(prefix = "/users", tags = ["Users"])

@router.post('/add')
async def add_user(user: UserReq):
    userFound = await get_user(email = user.email)
    if userFound:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists")
    res = await create_user(
        username = user.username,
        email = user.email,
        password = hash(user.password)
    )
    if not res:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Could not add user")
    return {"user_id": res}

@router.get('/get')
async def ret_user(current_user = Depends(get_current_user)):
    user = await get_user(email = current_user.email)
    print(user)
    return {"username":user["username"]}