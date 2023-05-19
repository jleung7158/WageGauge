from pydantic import BaseModel
from typing import List, Optional, Union
from queries.pool import pool

class Error(BaseModel):
    message: str


class CompanyIn(BaseModel):
    name: str

class CompanyOut(BaseModel):
    id: int
    name: str


class CompanyRepository:
    def create(self, company: CompanyIn) -> CompanyOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO company
                            (name)
                        VALUES
                            (%s)
                        RETURNING id;
                        """,
                        [
                            company.name
                        ]
                    )
                    id= result.fetchone()[0]
                    return self.company_in_to_out(id, company)
        except Exception as e:
            print(e)
            return {"message": "Could not create position"}

    def get_all(self) -> Union[List[CompanyOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM company
                        ORDER BY id;
                        """
                    )
                    return [
                        self.record_to_company_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all companies"}

    def get_one(self, company_id: int) -> Optional[CompanyOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM company
                        WHERE id = %s;
                        """,
                        [company_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_company_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that position cuh"}

    def update(self, company_id: int, company: CompanyIn) -> Union[CompanyOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE company
                        SET name = %s
                        WHERE id = %s
                        """,
                        [
                            company.name,
                            company_id
                        ]
                    )
                    return self.company_in_to_out(company_id, company)
        except Exception as e:
            print(e)
            return {"message": "Update Failed Cuh"}

    def delete(self, company_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM company
                        WHERE id = %s
                        """,
                        [company_id]
                    )
        except Exception as e:
            print(e)
            return {"message": "delete failed cuh"}

    def company_in_to_out(self, id: int, company: CompanyIn):
            old_data = company.dict()
            return CompanyOut(id=id, **old_data)

    def record_to_company_out(self, record):
        return CompanyOut(
            id=record[0],
            name=record[1],
        )
