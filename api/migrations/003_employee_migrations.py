steps = [
    [
        ##Create the table
        """

        CREATE TABLE employees (
            id SERIAL PRIMARY KEY NOT NULL,
            salary INT NOT NULL,
            years_exp VARCHAR(100) NOT NULL,
            location VARCHAR(1000) NULL,
            account_id INT NULL,
            company_id INT NULL,
            position_id INT NULL
        );
        """,
        ## Drop the Table
        """
        DROP TABLE employees;
        """,
    ]
]
