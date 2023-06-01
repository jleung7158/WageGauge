from fastapi import APIRouter, Depends, Response
from typing import Union
from queries.reply_likes import (
    Error,
    ReplyLikeIn,
    ReplyLikeOut,
    ReplyLikeRepo,
)

router = APIRouter()
depend = Depends()


@router.post("/api/reply_likes", response_model=Union[ReplyLikeOut, Error])
def create_reply_like(reply_like: ReplyLikeIn, repo: ReplyLikeRepo = depend):
    return repo.create(reply_like)


@router.get("/api/reply_likes", response_model=list[ReplyLikeOut])
def list_reply_likes(repo: ReplyLikeRepo = Depends()):
    return repo.get_all()


@router.delete("/api/reply_likes/{reply_like_id}", response_model=bool)
def delete_reply_like(
    reply_like_id: int,
    repo: ReplyLikeRepo = depend,
) -> bool:
    return repo.delete(reply_like_id)
