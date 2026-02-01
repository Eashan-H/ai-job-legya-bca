from fastapi import FastAPI
from database import engine, Base
from routers import users, events

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(users.router)
app.include_router(events.router)

@app.get("/")
def read_root():
    return {"Hello": "World"}
