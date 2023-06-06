from fastapi.testclient import TestClient
from main import app
from queries.companies import CompanyRepository
from pydantic import BaseModel

client = TestClient(app)


class CompanyOut(BaseModel):
    id: int
    name: str
    img: str


class EmptyCompanyRepo:
    def get_all(self, id=None):
        return []


def fake_get_company_data():
    return CompanyOut(id=1, name="googie", img="image_url")


def test_get_company():
    app.dependency_overrides[CompanyRepository] = EmptyCompanyRepo
    response = client.get("/companies")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []
