from pydantic import BaseModel
from typing import List, Optional, Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class TopicIn(BaseModel):
    text: str
    account_id: int


class TopicOut(BaseModel):
    id: int
    text: str
    account_id: str


class TopicRepository:
    def create(self, topic: TopicIn) -> TopicOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO topics
                            (text, account_id)
                        VALUES
                        (%s, %s)
                        RETURNING id;
                        """,
                        [
                            topic.text,
                            topic.account_id,
                        ],
                    )
                    id = result.fetchone()[0]
                    return self.topic_in_to_out(id, topic)

        except Exception as e:
            print(e)
            return {"message": "topic not created"}

    def get_all(self) -> Union[List[TopicOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM topics
                        ORDER BY id;
                        """
                    )
                    return [
                        self.record_to_topic_out(record) for record in result
                    ]

        except Exception as e:
            print(e)
            return {"message": "Could not retrieve topics"}

    def get_one(self, topic_id: int) -> Optional[TopicOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM topics
                        WHERE id = %s
                        """,
                        [topic_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_topic_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that topic"}

    def update(self, topic_id: int, topic: TopicIn) -> Optional[TopicOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE topics
                        SET text = %s,
                        account_id = %s
                        WHERE id = %s;
                        """,
                        [
                            topic.text,
                            topic.account_id,
                            topic_id,
                        ],
                    )
                    return self.topic_in_to_out(topic_id, topic)
        except Exception as e:
            print(e)
            return {"message": "Could not update that topic"}

    def delete(self, topic_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM topics
                        WHERE id = %s
                        """,
                        [topic_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return {"message": "Failed to Delete"}

    def topic_in_to_out(self, id: int, topic: TopicIn):
        old_data = topic.dict()
        return TopicOut(id=id, **old_data)

    def record_to_topic_out(self, record):
        return TopicOut(
            id=record[0],
            text=record[1],
            account_id=record[2],
        )
