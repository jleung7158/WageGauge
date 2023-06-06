from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator

from pydantic import BaseModel

from queries.accounts import (
    AccountIn,
    AccountOut,
    # AccountOutWithPassword,
    AccountRepository,
    DuplicateAccountError,
)


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: AccountOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.post("/api/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    repo: AccountRepository = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = repo.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())


@router.get("/api/accounts", response_model=list[AccountOut])
def list_accounts(repo: AccountRepository = Depends()):
    return repo.get_all()


# @router.post("/api/protected")
# async def create_protected(
#     account_data: dict = Depends(authenticator.get_current_account_data),
# ):
#     if status.HTTP_200_OK:
#         return True
#     elif status.HTTP_401_UNAUTHORIZED:
#         return False


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: dict = Depends(authenticator.try_get_current_account_data),
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }
    if not account:
        raise HTTPException(status.HTTP_400_BAD_REQUEST)


@router.put("/api/accounts/{account_id}", response_model=AccountOut)
def update_account(
    account_id: int, account: AccountIn, repo: AccountRepository = Depends(),account_data: dict = Depends(authenticator.get_current_account_data)
) -> AccountOut:
    hashed_password = authenticator.hash_password(account.password)
    return repo.update_account(account_id, hashed_password, account)
