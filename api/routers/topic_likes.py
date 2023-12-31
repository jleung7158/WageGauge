from fastapi import APIRouter, Depends
from typing import Union
from queries.topic_likes import Error, TopicLikeIn, TopicLikeOut, TopicLikeRepo

router = APIRouter()
depend = Depends()


@router.post("/api/topic_likes", response_model=Union[TopicLikeOut, Error])
def create_topic_like(topic_like: TopicLikeIn, repo: TopicLikeRepo = depend):
    return repo.create(topic_like)


@router.get("/api/topic_likes", response_model=list[TopicLikeOut])
def list_topic_likes(repo: TopicLikeRepo = Depends()):
    return repo.get_all()


@router.delete("/api/topic_likes/{topic_like_id}", response_model=bool)
def delete_topic_like(
    topic_like_id: int,
    repo: TopicLikeRepo = depend,
) -> bool:
    return repo.delete(topic_like_id)
