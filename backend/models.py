from pydantic import BaseModel

class TokenData(BaseModel):
    email: str

class LoginReq(TokenData):
    password: str

    
class UserReq(LoginReq):
    username: str

class User(UserReq):
    id: str

    @staticmethod
    def from_doc(doc) -> "User":
        return User(
            id = str(doc["_id"]),
            username = doc["username"],
            email = doc["email"],
            password = doc["password"],
        )