from pydantic import BaseModel
from typing import List, Union
from queries.pool import pool
from fastapi import HTTPException


class Error(BaseModel):
    message: str


class TopicLikeIn(BaseModel):
    account_id: int
    topic_id: int


class TopicLikeOut(BaseModel):
    id: int
    account_id: int
    topic_id: int


class TopicLikeRepo:
    def create(self, topic_like: TopicLikeIn) -> TopicLikeOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                            id
                        FROM account
                        WHERE id = %s;
                        """,
                        [topic_like.account_id],
                    )
                    if result.fetchone() is None:
                        raise HTTPException(
                            status_code=400, detail="account_id does not exist"
                        )
                    result = db.execute(
                        """
                        SELECT
                            id
                        FROM topics
                        WHERE id = %s;
                        """,
                        [topic_like.topic_id],
                    )
                    if result.fetchone() is None:
                        raise HTTPException(
                            status_code=400, detail="topic_id doesn't exist"
                        )
                    result = db.execute(
                        """
                        INSERT INTO topic_likes
                            (account_id, topic_id)
                        VAlUES
                            (%s, %s)
                        RETURNING id;
                        """,
                        [topic_like.account_id, topic_like.topic_id],
                    )
                    id = result.fetchone()[0]
                    return TopicLikeOut(id=id, **topic_like.dict())

        except Exception as e:
            print(e)
            raise HTTPException(status_code=500, detail="Could not add like")

    def get_all(self) -> Union[List[TopicLikeOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM topic_likes
                        ORDER BY id;
                        """
                    )
                    return [
                        TopicLikeOut(
                            id=i[0],
                            account_id=i[1],
                            topic_id=i[2],
                        )
                        for i in result
                    ]

        except Exception as e:
            print(e)
            return {"message": "Could not retrieve topics"}

    def delete(self, topic_like_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM topic_likes
                        WHERE id = %s;
                        """,
                        [topic_like_id],
                    )
                    return True
        except Exception as e:
            print(e)
            raise HTTPException(
                status_code=500, detail="like unsuccessfully vanquished"
            )
