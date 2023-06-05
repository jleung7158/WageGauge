steps = [
    [
        ##Create the table
        """
        CREATE TABLE company (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL,
            img TEXT NULL
        );
        """,
        ## Drop the Table
        """
        DROP TABLE company;
        """,
    ]
]
