from pydantic import BaseModel
from queries.pool import pool

class Error(BaseModel):
    message: str

class Error(BaseModel):
    message: str

class EmployeeIn(BaseModel):
    salary: int
    location: str

class EmployeeOut(BaseModel):
    id: int
    salary: int
    location: str
    accountId: int
    companyId: int
    positionId: int


class EmployeeRepository:
    def create(self, employee: EmployeeIn) -> EmployeeOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                """
                INSERT INTO employee
                    (salary, location)
                VALUES
                    (%s, %s)
                    RETURNING id;
                """,
                [
                    employee.salary,
                    employee.location
                ]
            )
            id= result.fetchone()[0]
            return self.employee_in_to_out(id, employee)

    def employee_in_to_out(self, id: int, employee: EmployeeIn):
        old_data= employee.dict()
        return EmployeeOut(id=id, ** old_data)
