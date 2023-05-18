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
<<<<<<< HEAD
            location VARCHAR(100) NOT NULL
=======
            location VARCHAR(1000) NOT NULL
>>>>>>> 501663937f5de7105de365fb103d41d73a9a0d61
        );
        """,
        ## Drop the Table
        """
        DROP TABLE employee;
        """
    ]
]
