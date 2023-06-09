import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.accounts import (
    AccountRepository,
    AccountOut
)


class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        email: str,
        account: AccountRepository,
    ):
        return account.get(email)

    def get_account_getter(
        self,
        account: AccountRepository = Depends(),
    ):
        return account

    def get_hashed_password(self, account: AccountOut):
        return account["password"]

    def get_account_data_for_cookie(self, account: AccountOut):
        return account['email'], AccountOut(**account)


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
