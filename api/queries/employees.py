from pydantic import BaseModel
from queries.pool import pool
from typing import List, Optional, Union
from fastapi import HTTPException


class Error(BaseModel):
    message: str


class EmployeeIn(BaseModel):
    salary: int
    years_exp: str
    location: str
    account_id: Optional[int]
    company_id: Optional[int]
    position_id: Optional[int]


class EmployeeOut(BaseModel):
    id: int
    salary: int
    years_exp: str
    location: str
    account_id: Optional[int]
    company_id: Optional[int]
    position_id: Optional[int]
    position: Optional[str]
    company: Optional[str]


class EmployeeRepository:
    def create(self, employee: EmployeeIn) -> EmployeeOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                        SELECT
                        p.id
                        FROM positions AS p
                        LEFT JOIN company c
                        ON (c.id = p.company_id)
                        where c.id= %s
                    """,
                    [employee.company_id],
                )
                pids = [row[0] for row in result]
                if employee.position_id not in pids:
                    raise HTTPException(status_code=400)
                result = db.execute(
                    """
                        SELECT
                        id from account
                        where id= %s
                    """,
                    [employee.account_id],
                )
                # rows = [row for row in result]
                # rows = result.fetchall()
                if len(result.fetchall()) == 0:
                    raise HTTPException(status_code=400)
                result = db.execute(
                    """
                    INSERT INTO employees
                        (
                        salary,
                        years_exp,
                        location,
                        account_id,
                        company_id,
                        position_id
                        )
                    VALUES
                        (%s, %s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        employee.salary,
                        employee.years_exp,
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
                            e.years_exp as experience,
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
                            years_exp = %s,
                            location = %s,
                            account_id = %s,
                            company_id = %s,
                            position_id = %s
                        WHERE id = %s;
                        """,
                        [
                            employee.salary,
                            employee.years_exp,
                            employee.location,
                            employee.account_id,
                            employee.company_id,
                            employee.position_id,
                            employee_id,
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
                            e.years_exp as experience,
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
            years_exp=record[2],
            location=record[3],
            account_id=record[4],
            company_id=record[5],
            position_id=record[6],
            position=record[7],
            company=record[8],
        )
