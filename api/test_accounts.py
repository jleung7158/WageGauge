from fastapi.testclient import TestClient
from main import app
from queries.accounts import AccountRepository
from pydantic import BaseModel
from authenticator import authenticator


client = TestClient(app)


class AccountOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str


class EmptyAccountRepo:
    def get_all(self, id=None):
        return []


def fake_current_account_data():
    account = AccountOut(
        id=1, first_name="Mo", last_name="Rahman", email="mo@mo.com"
    )
    return account.__dict__


def test_list_accounts():
    app.dependency_overrides[AccountRepository] = EmptyAccountRepo
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_current_account_data
    response = client.get("/api/accounts")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []
