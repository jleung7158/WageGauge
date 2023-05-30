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
def get_all_comments(
    repo: CommentRepository = Depends(),
):
    return repo.get_all()


@router.put("/comments/{comment_id}", response_model=Union[CommentOut, Error])
def update_comment(
    comment_id: int,
    comment: CommentIn,
    repo: CommentRepository = Depends(),
) -> Union[CommentOut, Error]:
    return repo.update(comment_id, comment)


@router.delete("/comments/{comment_id}", response_model=bool)
def delete_comment(
    comment_id: int,
    repo: CommentRepository = Depends(),
) -> bool:
    return repo.delete(comment_id)


@router.get("/comments/{comment_id}", response_model=Optional[CommentOut])
def get_one_comment(
    comment_id: int,
    response: Response,
    repo: CommentRepository = Depends(),
) -> CommentOut:
    comment = repo.get_one(comment_id)
    if comment is None:
        response.status_code = 404
    return comment
