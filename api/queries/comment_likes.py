from pydantic import BaseModel
from typing import List, Optional, Union
from queries.pool import pool
from fastapi import HTTPException


class Error(BaseModel):
    message: str


class CommentLikeIn(BaseModel):
    account_id: int
    comment_id: int


class CommentLikeOut(BaseModel):
    id: int
    account_id: int
    comment_id: int


class CommentLikeRepo:
    def create(self, comment_like: CommentLikeIn) -> CommentLikeOut:
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
                        [comment_like.account_id],
                    )
                    if result.fetchone() is None:
                        raise HTTPException(
                            status_code=400,
                            detail="account_id exists not in this earthly realm",
                        )
                    result = db.execute(
                        """
                        SELECT
                            id
                        FROM comments
                        WHERE id = %s;
                        """,
                        [comment_like.comment_id],
                    )
                    if result.fetchone() is None:
                        raise HTTPException(
                            status_code=400,
                            detail="comment_id has left this material plane",
                        )
                    result = db.execute(
                        """
                        INSERT INTO comment_likes
                            (account_id, comment_id)
                        VALUES
                            (%s, %s)
                        RETURNING id;
                        """,
                        [comment_like.account_id, comment_like.comment_id],
                    )
                    id = result.fetchone()[0]
                    return CommentLikeOut(id=id, **comment_like.dict())
        except Exception as e:
            print(e)
            raise HTTPException(status_code=500, detail="Could not add like")

    def get_all(self) -> Union[List[CommentLikeOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM comment_likes
                        ORDER BY id;
                        """
                    )
                    return [
                        CommentLikeOut(
                            id=i[0],
                            account_id=i[1],
                            comment_id=i[2],
                        )
                        for i in result
                    ]
        except Exception as e:
            print(e)
            raise HTTPException(status_code=500, detail="Could not get likes")

    def delete(self, id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                    DELETE FROM comment_likes
                    WHERE id = %s;
                    """,
                        [id],
                    )
                    return True
        except Exception as e:
            print(e)
            raise HTTPException(
                status_code=500, detail="like unsuccessfully vanquished"
            )
