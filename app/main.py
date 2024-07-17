from fastapi import FastAPI, Depends
from app.database import engine, database
from app.routers import auth, matching
from app import models, dependencies
from app.settings import settings  # settings 불러오기

app = FastAPI()


@app.on_event("startup")
async def startup():
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()


app.include_router(auth.router)
app.include_router(matching.router)
