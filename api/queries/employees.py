from pydantic import BaseModel
from queries.pool import pool
from typing import List, Optional, Union


class Error(BaseModel):
    message: str


class Error(BaseModel):
    message: str


class EmployeeIn(BaseModel):
    salary: int
    location: str
    account_id: Optional[int]
    company_id: Optional[int]
    position_id: Optional[int]


class EmployeeOut(BaseModel):
    id: int
    salary: int
    location: str
    account_id: Optional[int]
    company_id: Optional[int]
    position_id: Optional[int]
    position: Optional[str]
    company: Optional[str]


class EmployeeRepository:
    def create(self, employee: EmployeeIn) -> EmployeeOut:
        # try:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO employees
                        (salary, location, account_id, company_id, position_id)
                    VALUES
                        (%s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        employee.salary,
                        employee.location,
                        employee.account_id,
                        employee.company_id,
                        employee.position_id,
                    ],
                )
                id = result.fetchone()[0]
                return self.employee_in_to_out(id, employee)

    # except Exception as e:
    #     print(e)
    #     return {"message": "Could not create employee"}

    def get_all(self) -> Union[List[EmployeeOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                            e.id as employee,
                            e.salary as salary,
                            e.location as location,
                            e.account_id as account_id,
                            e.company_id as company_id,
                            e.position_id as position,
                            p.name as position,
                            c.name as company
                        FROM employees as e
                        LEFT JOIN positions as p ON (p.id=e.position_id)
                        LEFT JOIN company as c ON (c.id=e.company_id)
                        ORDER BY e.id;
                        """
                    )
                    return [
                        self.record_to_employee_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all employees"}

    def update(
        self, employee_id: int, employee: EmployeeIn
    ) -> Union[EmployeeOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE employees
                        SET salary = %s,
                            location = %s,
                            account_id = %s,
                            company_id = %s,
                            position_id = %s
                        """,
                        [
                            employee.salary,
                            employee.location,
                            employee.account_id,
                            employee.company_id,
                            employee.position_id,
                        ],
                    )
                    return self.employee_in_to_out(employee_id, employee)
        except Exception as e:
            print(e)
            return {"message": "Could not update employees"}

    def get_one(self, employee_id: int) -> Optional[EmployeeOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                            e.id as employee,
                            e.salary as salary,
                            e.location as location,
                            e.account_id as account_id,
                            e.company_id as company_id,
                            e.position_id as position,
                            p.name as position,
                            c.name as company
                        FROM employees as e
                        LEFT JOIN positions as p ON (p.id=e.position_id)
                        LEFT JOIN company as c ON (c.id=e.company_id)
                        WHERE e.id= %s
                        ORDER BY e.id;
                        """,
                        [employee_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_employee_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that employee"}

    def delete(self, employee_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM employees
                        WHERE ID = %s;
                        """,
                        [employee_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return {"message": "Could not delete employee"}

    def employee_in_to_out(self, id: int, employee: EmployeeIn):
        old_data = employee.dict()
        return EmployeeOut(id=id, **old_data)

    def record_to_employee_out(self, record):
        return EmployeeOut(
            id=record[0],
            salary=record[1],
            location=record[2],
            account_id=record[3],
            company_id=record[4],
            position_id=record[5],
            position=record[6],
            company=record[7],
        )
