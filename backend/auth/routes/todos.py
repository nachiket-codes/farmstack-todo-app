from fastapi import APIRouter, HTTPException, status, Depends
from crud import get_todos, get_user, delete_todo, change_todo, add_todo
from ..oauth2 import get_current_user
from models import Todo, TodoReq

router = APIRouter(prefix = '/todos', tags = ["Todo"])

@router.get('/')
async def get_all_todos(current_user = Depends(get_current_user)):
    user = await get_user(email = current_user.email)
    if user is None:
        raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail="Please login first")
    todos = await get_todos(user_id = user["_id"])
    return todos

@router.delete("/{todo_id}")
async def remove_todo(todo_id: str, current_user = Depends(get_current_user)):
    user = await get_user(email = current_user.email)
    if user is None:
        raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail="Please login first")
    if await delete_todo(user_id = user["_id"], todo_id = todo_id):
        return {"message": "Todo deleted successfully"}
    return {"message" : "Failed to delete the todo"}

@router.put("/edit")
async def edit_todo(todo: Todo, current_user = Depends(get_current_user)):
    user = await get_user(email = current_user.email)
    if user is None:
        raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail="Please login first")
    if await change_todo(user_id = user["_id"], todo = todo):
        return {"message": "Todo updated successfully"}
    return {"message" : "Failed to update the todo"}

@router.post("/add")
async def insert_todo(todo: TodoReq, current_user = Depends(get_current_user)):
    user = await get_user(email = current_user.email)
    if user is None:
        raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail="Please login first")
    if await add_todo(user_id = user["_id"], todo = todo):
        return {"message": "Todo added successfully"}
    return {"message" : "Failed to add the todo"}
