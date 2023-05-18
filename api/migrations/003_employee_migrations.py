steps = [
    [
        ##Create the table
        """

        CREATE TABLE employee (
            id SERIAL PRIMARY KEY NOT NULL,
            position_id INT NULL,
            account_id INT NULL,
            company_id INT NULL,
            salary INT,
            location VARCHAR(1000) NOT NULL
        );
        """,
        ## Drop the Table
        """
        DROP TABLE employee;
        """
    ]
]
