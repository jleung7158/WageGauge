from pydantic import BaseModel
from typing import List, Optional, Union

from queries.pool import pool


class Error(BaseModel):
    message: str


class CommentIn(BaseModel):
    text: Optional[str]
    account_id: Optional[int]
    topic_id: Optional[int]


class CommentOut(BaseModel):
    id: int
    text: Optional[str]
    account_id: Optional[int]
    topic_id: Optional[int]
    topic: Optional[str]


class CommentRepository:
    def create(self, comment: CommentIn) -> CommentOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                    INSERT INTO comments
                        (text, account_id, topic_id)
                    VALUES
                        (%s, %s, %s)
                    RETURNING id;
                    """,
                        [
                            comment.text,
                            comment.account_id,
                            comment.topic_id,
                        ],
                    )
                    id = result.fetchone()[0]
                    return self.comment_in_to_out(id, comment)
        except Exception as e:
            print(e)
            return {"message": "Could not create comment"}

    def get_all(self) -> Union[List[CommentOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT c.id AS comment_id,
                        c.text AS comments,
                        c.account_id AS account,
                        c.topic_id AS topic_id,
                        t.text AS topic
                        FROM comments AS c
                        LEFT JOIN topics t
                        ON (t.id = c.topic_id)
                        ORDER BY t.id;
                        """
                    )
                    return [
                        self.record_to_comment_out(record) for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all comments"}

    def update(
        self, comment_id: int, comment: CommentIn
    ) -> Union[CommentOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE comments
                        SET text = %s
                            , account_id = %s
                            , topic_id = %s
                        WHERE id = %s;
                        """,
                        [
                            comment.text,
                            comment.account_id,
                            comment.topic_id,
                            comment_id,
                        ],
                    )
                    return self.comment_in_to_out(comment_id, comment)
        except Exception as e:
            print(e)
            return {"message": "Could not update comment"}

    def get_one(self, comment_id: int) -> Optional[CommentOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT c.id AS comment_id,
                        c.text AS comments,
                        c.account_id AS account,
                        c.topic_id AS topic_id,
                        t.text AS topic
                        FROM comments AS c
                        LEFT JOIN topics t
                        ON (t.id = c.topic_id)
                        WHERE c.id = %s
                        ORDER BY t.id;
                        """,
                        [comment_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_comment_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that comment"}

    def delete(self, comment_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM comments
                        WHERE ID = %s;
                        """,
                        [comment_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return {"message": "Could not delete comment"}

    def comment_in_to_out(self, id: int, comment: CommentIn):
        old_data = comment.dict()
        return CommentOut(id=id, **old_data)

    def record_to_comment_out(self, record):
        return CommentOut(
            id=record[0],
            text=record[1],
            account_id=record[2],
            topic_id=record[3],
            topic=record[4],
        )
