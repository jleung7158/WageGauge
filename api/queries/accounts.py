from pydantic import BaseModel
from queries.pool import pool


class DuplicateAccountError(ValueError):
    pass

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

class AccountOutWithPassword(AccountOut):
    hashed_password: str

class AccountRepository:
    def create(self, info: AccountIn, hashed_password: str) ->AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO account
                        (first_name, last_name, email, password)
                    VALUES
                        (%s, %s, %s, %s)
                    RETURNING id, email, password;
                    """,
                    [
                        info.first_name,
                        info.last_name,
                        info.email,
                        hashed_password,
                    ],
                );
                id= result.fetchone()[0]
                old_account = info.dict()
                return AccountOutWithPassword(
                        id=id,
                        first_name=info.first_name,
                        last_name= info.last_name,
                        email=info.email,
                        hashed_password=info.password,
                    )

    def get(self, email:str)->AccountOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                            , first_name
                            , last_name
                            , email
                            , password
                        FROM account
                        WHERE email =%s
                        """,
                        [email]
                    );
                    record= result.fetchone()
                    return self.record_to_account(record)
        except Exception as e:
            print(e)
            raise ValueError("Could not get account") from e

    def record_to_account(self, record)->AccountOutWithPassword:
        account_dict={
            "id": record[0],
            "first_name": record[1],
            "last_name": record[2],
            "email": record[3],
            "password": record[4],
        }
        return account_dict

    def account_in_to_out(self, id: int, account: AccountIn):
        old_data= account.dict()
        return AccountOutWithPassword(id=id, **old_data)
