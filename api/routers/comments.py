from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from queries.comments import (
    Error,
    CommentIn,
    CommentOut,
    CommentRepository,
)


router = APIRouter()


@router.post("/comments", response_model=Union[CommentOut, Error])
def create_comment(comment: CommentIn, repo: CommentRepository = Depends()):
    return repo.create(comment)


@router.get("/comments", response_model=List[CommentOut])
def get_all(
    repo: CommentRepository = Depends(),
):
    return repo.get_all()
