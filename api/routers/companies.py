from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from queries.companies import CompanyIn, CompanyOut, CompanyRepository, Error
from authenticator import authenticator

router = APIRouter()
depend = Depends()


@router.post("/companies", response_model=Union[CompanyOut, Error])
def create_company(
    company: CompanyIn,
    repo: CompanyRepository = depend,
    account_data: dict = Depends(authenticator.get_current_account_data)
    ):
    return repo.create(company)


@router.get("/companies", response_model=List[CompanyOut])
def get_all(repo: CompanyRepository = depend):
    return repo.get_all()


@router.put("/companies/{company_id}", response_model=Union[CompanyOut, Error])
def update_company(
    company_id: int,
    company: CompanyIn,
    repo: CompanyRepository = depend,
    account_data: dict = Depends(authenticator.get_current_account_data)
) -> Union[CompanyOut, Error]:
    return repo.update(company_id, company)


@router.delete("/companies/{company_id}", response_model=bool)
def delete_company(
    company_id: int,
    repo: CompanyRepository = depend,
    account_data: dict = Depends(authenticator.get_current_account_data)
) -> bool:
    return repo.delete(company_id)


@router.get("/companies/{company_id}", response_model=Optional[CompanyOut])
def get_one(
    company_id: int,
    response: Response,
    repo: CompanyRepository = depend,
) -> CompanyOut:
    company = repo.get_one(company_id)
    if company is None:
        response.status_code = 404
    return company
