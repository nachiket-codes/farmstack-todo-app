from database import todo_collection
from models import User

async def get_user(email: str):
    user = await todo_collection.find_one({"email": email})
    return User.from_doc(user)

async def create_user(username: str, email: str, password: str):
    user_doc = {
        "username": username,
        "email": email,
        "password": password
    }
    result = await todo_collection.insert_one(user_doc)
    return result.inserted_id