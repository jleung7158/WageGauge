from pydantic import BaseModel
from typing import List, Optional, Union
from datetime import date
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
                            position.description
                        ]
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
                        SELECT id, name, from_date, to_date, description
                        FROM positions
                        ORDER BY id;
                        """
                    )
                    return [
                        self.record_to_position_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all positions"}
    
    def update(self, position_id:int, position: PositionIn) -> Union[PositionOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE positions
                        SET name = %s
                            , company_id = %s
                            , description = %s
                        WHERE id = %s
                        """,
                        [
                            position.name,
                            position.company_id,
                            position.description,
                            position_id
                        ]
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
                        SELECT id
                            , name
                            , from_date
                            , to_date
                            , description
                        FROM positions
                        WHERE id = %s
                        """,
                        [position_id]
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
                        WHERE ID = %s
                        """,
                        [position_id]
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
            from_date=record[2],
            to_date=record[3],
            description=record[4]
        )
