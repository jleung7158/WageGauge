from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from authenticator import authenticator
from queries.topics import (
    Error,
    TopicIn,
    TopicOut,
    TopicRepository,
)

router = APIRouter()
depend = Depends()


@router.post("/topics", response_model=Union[TopicOut, Error])
def create_topic(
    topic: TopicIn,
    repo: TopicRepository = depend,
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.create(topic)


@router.get("/topics", response_model=List[TopicOut])
def get_all(repo: TopicRepository = depend):
    return repo.get_all()


@router.get("/topics/{topic_id}", response_model=Optional[TopicOut])
def get_one(
    topic_id: int,
    response: Response,
    repo: TopicRepository = depend,
) -> TopicOut:
    topic = repo.get_one(topic_id)
    if topic is None:
        response.status_code = 404
    return topic


@router.put("/topics/{topic_id}", response_model=Union[TopicOut, Error])
def update_one(
    topic_id: int,
    topic: TopicIn,
    repo: TopicRepository = depend,
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[TopicOut, Error]:
    return repo.update(topic_id, topic)


@router.delete("/topics/{topic_id}", response_model=bool)
def delete(
    topic_id: int,
    repo: TopicRepository = depend,
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete(topic_id)
