from pydantic import BaseModel
from typing import List, Union
from queries.pool import pool
from fastapi import HTTPException


class Error(BaseModel):
    message: str


class ReplyLikeIn(BaseModel):
    account_id: int
    reply_id: int


class ReplyLikeOut(BaseModel):
    id: int
    account_id: int
    reply_id: int


class ReplyLikeRepo:
    def create(self, reply_like: ReplyLikeIn) -> ReplyLikeOut:
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
                        [reply_like.account_id],
                    )
                    if result.fetchone() is None:
                        raise HTTPException(
                            status_code=400, detail="account_id does not exist"
                        )
                    result = db.execute(
                        """
                        SELECT
                            id
                        FROM replies
                        WHERE id = %s;
                        """,
                        [reply_like.reply_id],
                    )
                    if result.fetchone() is None:
                        raise HTTPException(
                            status_code=400,
                            detail="reply_id exists only in legend",
                        )
                    result = db.execute(
                        """
                        INSERT INTO reply_likes
                            (account_id, reply_id)
                        VALUES
                            (%s, %s)
                        RETURNING id;
                        """,
                        [reply_like.account_id, reply_like.reply_id],
                    )
                    id = result.fetchone()[0]
                    return ReplyLikeOut(id=id, **reply_like.dict())
        except Exception as e:
            print(e)
            raise HTTPException(status_code=500, detail="Could not add like")

    def get_all(self) -> Union[List[ReplyLikeOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                            id,
                            account_id,
                            reply_id
                        FROM reply_likes
                        ORDER BY id;
                        """
                    )
                    return [
                        ReplyLikeOut(
                            id=i[0],
                            account_id=i[1],
                            reply_id=i[2],
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
                    DELETE FROM reply_likes
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
