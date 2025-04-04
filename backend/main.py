from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from auth.routes import authorize, users, todos

app = FastAPI()
app.include_router(authorize.router)
app.include_router(users.router)
app.include_router(todos.router)

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def home():
    return {"message": "Hello, World!"}