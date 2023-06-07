from pydantic import BaseModel
from typing import List, Optional, Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class TopicIn(BaseModel):
    title: str
    body: str
    account_id: int
    company_id: int


class TopicOut(BaseModel):
    id: int
    title: str
    body: str
    account_id: int
    company_id: int
    likes: Optional[int]


class TopicRepository:
    def create(self, topic: TopicIn) -> TopicOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO topics
                            (title, body, account_id, company_id)
                        VALUES
                        (%s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            topic.title,
                            topic.body,
                            topic.account_id,
                            topic.company_id,
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
                        SELECT DISTINCT t.id AS id,
                        t.title AS title,
                        t.body AS body,
                        t.account_id AS account_id,
                        t.company_id AS company_id,
                        (SELECT COUNT(account_id)
                            FROM topic_likes l
                            WHERE (l.topic_id = t.id)) AS likes
                        FROM topics AS t
                        LEFT JOIN topic_likes AS l
                        ON (l.topic_id = t.id)
                        ORDER BY t.id;
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
                        SELECT DISTINCT t.id AS id,
                        t.title AS title,
                        t.body AS body,
                        t.account_id AS account_id,
                        t.company_id AS company_id,
                        (SELECT COUNT(account_id)
                            FROM topic_likes l
                            WHERE (l.topic_id = t.id)) AS likes
                        FROM topics AS t
                        LEFT JOIN topic_likes AS l
                        ON (l.topic_id = t.id)
                        WHERE t.id = %s
                        ORDER BY t.id;
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
                        SET title = %s,
                        body = %s,
                        account_id = %s,
                        company_id = %s
                        WHERE id = %s;
                        """,
                        [
                            topic.title,
                            topic.body,
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
            title=record[1],
            body=record[2],
            account_id=record[3],
            company_id=record[4],
            likes=record[5],
        )
