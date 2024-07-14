from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from pinnacle.api.routes import include_routers

app = FastAPI()

include_routers(app)

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
