steps = [
    [
        ## Create the Table
        """
        CREATE TABLE topics (
            id SERIAL PRIMARY KEY NOT NULL,
            title VARCHAR(1000) NOT NULL,
            body VARCHAR(5000) NOT NULL,
            account_id INT NOT NULL,
            company_id INT NOT NULL
        );
        """,
        ## Drop the Table
        """
        DROP TABLE topics
        """,
    ]
]
