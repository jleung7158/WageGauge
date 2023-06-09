from pydantic import BaseModel
from typing import List, Optional, Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class PositionIn(BaseModel):
    name: str
    company_id: Optional[int]
    description: Optional[str]


class PositionOut(BaseModel):
    id: int
    name: str
    company_id: Optional[int]
    description: Optional[str]
    company: Optional[str]


class PositionRepository:
    def create(self, position: PositionIn) -> PositionOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                    INSERT INTO positions
                        (name, company_id, description)
                    VALUES
                        (%s, %s, %s)
                    RETURNING id;
                    """,
                        [
                            position.name,
                            position.company_id,
                            position.description,
                        ],
                    )
                    id = result.fetchone()[0]
                    return self.position_in_to_out(id, position)
        except Exception as e:
            print(e)
            return {"message": "Could not create position"}

    def get_all(self) -> Union[List[PositionOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT p.id AS position_id,
                        p.name AS positions,
                        p.company_id AS company_id,
                        p.description AS description,
                        c.name AS company
                        FROM positions AS p
                        LEFT JOIN company c
                        ON (c.id = p.company_id)
                        ORDER BY p.name, c.name;
                        """
                    )
                    return [
                        self.record_to_position_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all positions"}

    def update(
        self, position_id: int, position: PositionIn
    ) -> Union[PositionOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE positions
                        SET name = %s
                            , company_id = %s
                            , description = %s
                        WHERE id = %s;
                        """,
                        [
                            position.name,
                            position.company_id,
                            position.description,
                            position_id,
                        ],
                    )
                    return self.position_in_to_out(position_id, position)
        except Exception as e:
            print(e)
            return {"message": "Could not update position"}

    def get_one(self, position_id: int) -> Optional[PositionOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT p.id AS position_id,
                        p.name AS positions,
                        p.company_id AS company_id,
                        p.description AS description,
                        c.name AS company
                        FROM positions AS p
                        LEFT JOIN company c
                        ON (c.id = p.company_id)
                        WHERE p.id = %s
                        ORDER BY p.name, c.name;
                        """,
                        [position_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_position_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that position"}

    def delete(self, position_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM positions
                        WHERE ID = %s;
                        """,
                        [position_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return {"message": "Could not delete position"}

    def position_in_to_out(self, id: int, position: PositionIn):
        old_data = position.dict()
        return PositionOut(id=id, **old_data)

    def record_to_position_out(self, record):
        return PositionOut(
            id=record[0],
            name=record[1],
            company_id=record[2],
            description=record[3],
            company=record[4],
        )
