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
                        c.topic_id AS topic,
                        FROM comments AS c
                        LEFT JOIN topic t
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
        self, comment_id: int, comment: PositionIn
    ) -> Union[PositionOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE comments
                        SET name = %s
                            , company_id = %s
                            , description = %s
                        WHERE id = %s;
                        """,
                        [
                            comment.name,
                            comment.company_id,
                            comment.description,
                            comment_id,
                        ],
                    )
                    return self.comment_in_to_out(comment_id, comment)
        except Exception as e:
            print(e)
            return {"message": "Could not update comment"}

    def comment_in_to_out(self, id: int, comment: CommentIn):
        old_data = comment.dict()
        return CommentOut(id=id, **old_data)
