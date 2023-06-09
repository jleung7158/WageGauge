from fastapi.testclient import TestClient
from main import app
from queries.accounts import AccountRepository
from pydantic import BaseModel


client = TestClient(app)


class AccountOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str


class EmptyAccountRepo:
    def get_all(self, id=None):
        return []


def test_list_accounts():
    app.dependency_overrides[AccountRepository] = EmptyAccountRepo
    response = client.get("/api/accounts")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []
