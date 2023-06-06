from pydantic import BaseModel
from typing import List, Union
from queries.pool import pool
from fastapi import HTTPException


class Error(BaseModel):
    message: str


class ReplyIn(BaseModel):
    comment_id: int
    account_id: int
    topic_id: int
    text: str


class ReplyOut(BaseModel):
    id: int
    comment_id: int
    account_id: int
    topic_id: int
    text: str


class ReplyUpdate(BaseModel):
    text: str


class ReplyRepo:
    def create(self, reply: ReplyIn) -> ReplyOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                            id
                        FROM comments
                        WHERE id = %s;
                        """,
                        [reply.comment_id],
                    )
                    if result.fetchone() is None:
                        raise HTTPException(
                            status_code=400, detail="comment_id does not exist"
                        )
                    result = db.execute(
                        """
                        SELECT
                            id
                        FROM account
                        WHERE id = %s;
                        """,
                        [reply.account_id],
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
                        [reply.topic_id],
                    )
                    if result.fetchone() is None:
                        raise HTTPException(
                            status_code=400, detail="topic_id does not exist"
                        )
                    result = db.execute(
                        """
                        INSERT INTO replies
                            (comment_id, account_id, topic_id, text)
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            reply.comment_id,
                            reply.account_id,
                            reply.topic_id,
                            reply.text,
                        ],
                    )
                    id = result.fetchone()[0]
                    return ReplyOut(id=id, **reply.dict())
        except Exception as e:
            print(e)
            raise HTTPException(
                status_code=500, detail="Could not create reply"
            )

    def get_all(self) -> Union[List[ReplyOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                            id,
                            comment_id,
                            account_id,
                            topic_id,
                            text
                        FROM replies
                        ORDER BY id;
                        """
                    )
                    return [
                        ReplyOut(
                            id=i[0],
                            comment_id=i[1],
                            account_id=i[2],
                            topic_id=i[3],
                            text=i[4],
                        )
                        for i in result
                    ]
        except Exception as e:
            print(e)
            raise HTTPException(
                status_code=500, detail="Could not get replies"
            )

    def update(self, id: int, update: ReplyUpdate) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    UPDATE replies
                    SET text = %s
                    WHERE id = %s
                    """,
                    [update.text, id],
                )
                if db.rowcount == 0:
                    raise HTTPException(
                        status_code=404, detail="There is no reply to update"
                    )
                else:
                    return True

    def delete(self, id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM replies
                    WHERE id = %s
                    """,
                    [id],
                )
                if db.rowcount == 0:
                    raise HTTPException(
                        status_code=500, detail="There is no reply to delete"
                    )
                else:
                    return True
