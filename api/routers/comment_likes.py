from fastapi import APIRouter, Depends
from typing import Union
from queries.comment_likes import (
    Error,
    CommentLikeIn,
    CommentLikeOut,
    CommentLikeRepo,
)

router = APIRouter()
depend = Depends()


@router.post("/api/comment_likes", response_model=Union[CommentLikeOut, Error])
def create_comment_like(
    comment_like: CommentLikeIn, repo: CommentLikeRepo = depend
):
    return repo.create(comment_like)


@router.get("/api/comment_likes", response_model=list[CommentLikeOut])
def list_comment_likes(repo: CommentLikeRepo = Depends()):
    return repo.get_all()


@router.delete("/api/comment_likes/{comment_like_id}", response_model=bool)
def delete_comment_like(
    comment_like_id: int,
    repo: CommentLikeRepo = depend,
) -> bool:
    return repo.delete(comment_like_id)
