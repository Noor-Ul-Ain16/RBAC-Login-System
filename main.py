from fastapi import FastAPI
from database import Base, engine
import models
from routers import auth

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth.router)


@app.get("/")
def root():
    return {"message": "RBAC Login System is running!"}