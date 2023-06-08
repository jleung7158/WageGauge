from fastapi.testclient import TestClient
from main import app
from queries.employees import EmployeeRepository
from pydantic import BaseModel
from typing import Optional

client = TestClient(app)


class EmployeeOut(BaseModel):
    id: int
    salary: int
    years_exp: str
    location: str
    account_id: Optional[int]
    copmany_id: Optional[int]
    position_id: Optional[int]
    position: Optional[str]
    company: Optional[str]


class EmptyEmployeeRepo:
    def get_all(self, id=None):
        return []


def fake_current_employee_data():
    return EmployeeOut(
        id=1, salary=400000, years_exp="0-3", location="The Moon"
    )


def test_get_employee():
    app.dependency_overrides[EmployeeRepository] = EmptyEmployeeRepo
    response = client.get("/employees")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []
