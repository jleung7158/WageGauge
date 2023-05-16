from pydantic import BaseModel
from queries.pool import pool


class AccountIn(BaseModel):
    first_name: str
    last_name: str
    email: str
    password: str

class AccountOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    password: str
    # positionID: int


class AccountRepository:
    def create(self, account: AccountIn) ->AccountOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO account
                        (first_name, last_name, email, password)
                    VALUES
                        (%s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        account.first_name,
                        account.last_name,
                        account.email,
                        account.password,
                    ]
                );
                id= result.fetchone()[0]
                # onld_accout = account.dict()
                # return AccountOut(id=id, **old_account)
                return self.account_in_to_out(id, account)

    def account_in_to_out(self, id: int, account: AccountIn):
        old_data= account.dict()
        return AccountOut(id=id, **old_data)
