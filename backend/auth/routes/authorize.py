from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordRequestForm
from models import LoginReq
from crud import get_user
from hashing import verify_pwd
from ..tokens import create_access_token

router = APIRouter(tags = ["Authenticate"])

@router.post('/login')
async def login(loginData: OAuth2PasswordRequestForm = Depends()):
    user = await get_user(email = loginData.username)
    if not user or not verify_pwd(loginData.password, user.password):
        raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Wrong login credentials")
    return {
        'access_token' : create_access_token({'sub':user.email}),
        'token_type' : 'bearer'
    }