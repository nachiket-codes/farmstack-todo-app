from database import todo_collection
from models import UserReq, Todo, TodoReq
from bson import ObjectId

async def get_user(email: str):
    user = await todo_collection.find_one({"email": email}, {"todos" : 0})
    return user

async def create_user(username: str, email: str, password: str):
    user_doc = {
        "username": username,
        "email": email,
        "password": password,
        "todos":[]
    }
    result = await todo_collection.insert_one(user_doc)
    return str(result.inserted_id)

async def get_todos(user_id: str):
    userTodos = await todo_collection.find_one({"_id": ObjectId(user_id)}, {"todos" : 1, "_id" : 0})
    todos = userTodos["todos"]
    return todos

async def delete_todo(user_id: str, todo_id: str):
    result = await todo_collection.update_one(
        {"_id" : ObjectId(user_id)},
        {
            "$pull" : {
                "todos" : {"todo_id" : todo_id}
            }
        }
    )
    return bool(result.modified_count)

async def add_todo(user_id : str, todo : TodoReq):
    todo_doc = {
        "todo_id" : str(ObjectId()), 
        "todo_text" : todo.todo_text,
        "completed" : todo.completed
    }
    result = await todo_collection.update_one(
        {"_id" : ObjectId(user_id)},
        {
            "$push" : {
                "todos" : todo_doc
            }
        }
    )
    return bool(result.modified_count)

async def change_todo(user_id : str, todo : Todo):
    result = await todo_collection.update_one(
        {"_id" : ObjectId(user_id), "todos.todo_id" : todo.todo_id },
        {
            "$set" : {
                "todos.$.todo_text" : todo.todo_text,
                "todos.$.completed" : todo.completed
            }
        }
    )
    return bool(result.modified_count)