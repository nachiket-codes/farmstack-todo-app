import os
from fastapi import HTTPException
from jose import jwt
from datetime import datetime, timedelta
from dotenv import load_dotenv
from models import TokenData

load_dotenv()

SECRET_KEY = os.getenv('SECRET_KEY')
ALGORITHM = "HS256"
TOKEN_EXPIRE_MINS = 30

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        exp = datetime.utcnow() + expires_delta
    else:
        exp = datetime.utcnow() + timedelta(minutes = TOKEN_EXPIRE_MINS)
    to_encode.update({'exp' : exp})
    return jwt.encode(claims = to_encode, key = SECRET_KEY, algorithm = ALGORITHM)

def verify_access_token(token: str, credentials_exception: HTTPException):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms = [ALGORITHM])
        email = payload.get('sub', None)
        if email is None:
            raise credentials_exception
        return TokenData(email = email)
    except Exception:
        raise credentials_exception

