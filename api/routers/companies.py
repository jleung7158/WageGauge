from fastapi import APIRouter, Depends
from queries.companies import(
    CompanyIn,
    CompanyOut,
    CompanyRepository
)

router = APIRouter()
depend = Depends()

@router.post("/dashboard", response_model = CompanyOut)
def create_company(
    company: CompanyIn,
    repo: CompanyRepository=depend
):
    return repo.create(company)
