from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from queries.employees import (
    EmployeeIn,
    EmployeeOut,
    EmployeeRepository,
)

router = APIRouter()
depend = Depends()


@router.post("/employees", response_model=EmployeeOut)
def create_employee(
    employee: EmployeeIn, repo: EmployeeRepository = Depends()
):
    return repo.create(employee)


@router.get("/employees", response_model=List[EmployeeOut])
def get_all(repo: EmployeeRepository = Depends()):
    return repo.get_all()


@router.put(
    "/employees/{employee_id}", response_model=Union[EmployeeOut, bool]
)
def update_employee(
    employee_id: int,
    employee: EmployeeIn,
    repo: EmployeeRepository = Depends(),
) -> Union[EmployeeOut, bool]:
    return repo.update(employee_id, employee)


@router.delete("/employees/{employee_id}", response_model=bool)
def delete_employee(
    employee_id: int,
    repo: EmployeeRepository = Depends(),
) -> bool:
    return repo.delete(employee_id)


@router.get("/employee/{employee_id}", response_model=Optional[EmployeeOut])
def get_one_employee(
    employee_id: int,
    response: Response,
    repo: EmployeeRepository = Depends(),
) -> EmployeeOut:
    employee = repo.get_one(employee_id)
    if employee is None:
        response.status_code = 404
    return employee
