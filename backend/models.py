from pydantic import BaseModel
from typing import List

class TokenData(BaseModel):
    email: str

class LoginReq(TokenData):
    password: str

    
class UserReq(LoginReq):
    username: str

class User(UserReq):
    id: str
    todos : List[str] = []

    @staticmethod
    def from_doc(doc) -> "User":
        return User(
            id = str(doc["_id"]),
            username = doc["username"],
            email = doc["email"],
            password = doc["password"],
            todos = [Todo.from_doc(todo) for todo in doc["todos"]]
        )
    
class Todo(BaseModel):
    todo_id: str
    todo_text: str
    completed: bool = False

    @staticmethod
    def from_doc(doc) -> "Todo":
        return Todo(
            todo_id = str(doc["todo_id"]),
            todo_text = doc["todo_text"],
            completed = doc["completed"]
        )
    