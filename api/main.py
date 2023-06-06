from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import (
    accounts,
    companies,
    positions,
    employees,
    topics,
    comments,
    replies,
    topic_likes,
    comment_likes,
    reply_likes,
)
from authenticator import authenticator


app = FastAPI()
app.include_router(accounts.router)
app.include_router(companies.router)
app.include_router(positions.router)
app.include_router(employees.router)
app.include_router(topics.router)
app.include_router(comments.router)
app.include_router(authenticator.router)
app.include_router(replies.router)
app.include_router(topic_likes.router)
app.include_router(comment_likes.router)
app.include_router(reply_likes.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Hello World"}
