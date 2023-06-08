from fastapi.testclient import TestClient
from main import app
from queries.positions import PositionRepository
from pydantic import BaseModel
from typing import Optional
from authenticator import authenticator


client = TestClient(app)


class AccountOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str


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


class EmptyPositionRepo:
    def get_all(self, id=None):
        return []

    def create(self, position: PositionIn):
        return self.position_in_to_out(id=1, position=position)

    def position_in_to_out(self, id: int, position: PositionIn):
        old_data = position.dict()
        return PositionOut(id=id, **old_data)


fake_position_data = {
    "name": "Software Engineer",
    "company_id": 1,
    "description": "string",
}


def fake_get_current_account_data():
    return AccountOut(id=1, first_name="j", last_name="l", email="jl@jl.com")


def test_get_all_positions():
    app.dependency_overrides[PositionRepository] = EmptyPositionRepo
    response = client.get("/positions")
    print(response.json())
    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == []


def test_create_position():
    app.dependency_overrides[PositionRepository] = EmptyPositionRepo
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    response = client.post("/positions", json=fake_position_data)

    app.dependency_overrides = {}

    assert response.status_code == 200
    print(response.json())
    assert response.json() == {
        "id": 1,
        "name": "Software Engineer",
        "company_id": 1,
        "description": "string",
        "company": None,
    }


bad_fake_position_data = {}


def test_create_position2():
    app.dependency_overrides[PositionRepository] = EmptyPositionRepo
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    response = client.post("/positions", json=bad_fake_position_data)

    app.dependency_overrides = {}

    assert response.status_code == 422
    print(response.json())


bad_fake_position_data2 = {"not_name": "Software Engineer"}


def test_create_position3():
    app.dependency_overrides[PositionRepository] = EmptyPositionRepo
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    response = client.post("/positions", json=bad_fake_position_data2)

    app.dependency_overrides = {}

    assert response.status_code == 422
    print(response.json())


def test_create_position4():
    app.dependency_overrides[PositionRepository] = EmptyPositionRepo
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    response = client.post("/position", json=bad_fake_position_data2)

    app.dependency_overrides = {}

    assert response.status_code == 404
    print(response.json())
