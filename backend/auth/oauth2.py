from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from .tokens import verify_access_token

oauth_scheme = OAuth2PasswordBearer(tokenUrl = 'login')

def get_current_user(token: str = Depends(oauth_scheme)):
    credential_exceptions = HTTPException(
        status_code = status.HTTP_401_UNAUTHORIZED,
        detail = "Could not validate credentials",
        headers = {"WWW-Authenticate": "Bearer"},
    )
    return verify_access_token(token, credential_exceptions)