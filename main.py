from fastapi import FastAPI

from database import Base, engine
import models

from routers import auth, roles


Base.metadata.create_all(bind=engine)

app = FastAPI()


# Register routers
app.include_router(auth.router)
app.include_router(roles.router)


@app.get("/")
def root():
    return {
        "message": "RBAC Login System is running!"
    }