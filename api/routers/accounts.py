from fastapi import APIRouter, Depends
from queries.accounts import(
    AccountIn,
    AccountOut,
    AccountRepository
)

router= APIRouter()
depend= Depends()

@router.post("/accounts", response_model= AccountOut)
def create_account(
    account: AccountIn,
    repo: AccountRepository=depend
):
    return repo.create(account)
