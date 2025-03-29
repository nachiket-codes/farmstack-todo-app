from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()

mongo_url = os.getenv('MONGO_URL')

client = AsyncIOMotorClient(mongo_url)

db = client["todo_app"]
todo_collection = db["todo_col"]