steps = [
    [
        ## Create the Table
        """
        CREATE TABLE topics (
            id SERIAL PRIMARY KEY NOT NULL,
            text VARCHAR(1000) NOT NULL,
            account_id INT NOT NULL,
            likes INT NULL,
            comments INT NULL
        );
        """,
        ## Drop the Table
        """
        DROP TABLE topics
        """,
    ]
]
