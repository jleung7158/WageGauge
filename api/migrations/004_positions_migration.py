steps = [
    [
        ## Create the table
        """
		CREATE TABLE positions (
			id SERIAL PRIMARY KEY NOT NULL,
			name VARCHAR(1000) NOT NULL,
			company_id INT NULL,
			description TEXT
		);
		""",
        ## Drop the table
        """
		DROP TABLE positions;
			""",
    ]
]
