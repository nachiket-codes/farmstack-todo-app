from passlib.context import CryptContext

pwd_ctx = CryptContext(schemes = ["bcrypt"], deprecated = "auto")

def hash(password: str):
    return pwd_ctx.hash(password)

def verify_pwd(plain_password: str, hashed_password: str):
    return pwd_ctx.verify(plain_password, hashed_password)