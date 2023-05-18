from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
<<<<<<< HEAD
from routers import accounts, positions
=======
from routers import accounts, companies, positions, employees
>>>>>>> main
from authenticator import authenticator


app = FastAPI()
app.include_router(accounts.router)
app.include_router(companies.router)
app.include_router(positions.router)
<<<<<<< HEAD
=======
app.include_router(employees.router)
app.include_router(authenticator.router)
>>>>>>> main

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# @app.get("/api/launch-details")
# def launch_details():
#     return {
#         "launch_details": {
#             "module": 3,
#             "week": 17,
#             "day": 5,
#             "hour": 19,
#             "min": "00"
#         }
#     }
