from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from queries.replies import Error, ReplyIn, ReplyOut, ReplyUpdate, ReplyRepo

router = APIRouter()


@router.post("/api/reply", response_model=Union[ReplyOut, Error])
def create_reply(reply: ReplyIn, repo: ReplyRepo = Depends()):
    return repo.create(reply)


@router.get("/api/reply", response_model=list[ReplyOut])
def list_replies(repo: ReplyRepo = Depends()):
    return repo.get_all()


@router.put("/api/reply/{reply_id}", response_model=Union[ReplyOut, bool])
def update_reply(
    reply_id: int, reply: ReplyUpdate, repo: ReplyRepo = Depends()
) -> bool:
    return repo.update(reply_id, reply)


@router.delete("/api/reply/{reply_id}", response_model=bool)
def delete_reply(
    reply_id: int,
    repo: ReplyRepo = Depends(),
) -> bool:
    return repo.delete(reply_id)
