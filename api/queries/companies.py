from pydantic import BaseModel
from queries.pool import pool

class CompanyIn(BaseModel):
    name: str
    # position_id: int

class CompanyOut(BaseModel):
    id: int
    name: str

class CompanyRepository:
    def create(self, company: CompanyIn) -> CompanyOut:
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
                );
                id= result.fetchone()[0]
                return self.company_in_to_out(id, company)

    def company_in_to_out(self, id: int, company: CompanyIn):
            old_data = company.dict()
            return CompanyOut(id=id, **old_data)
