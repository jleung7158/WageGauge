steps = [
    [
        ## Create the table
        """
		CREATE TABLE comments (
			id SERIAL PRIMARY KEY NOT NULL,
			text VARCHAR(5000) NOT NULL,
			account_id INT NULL,
			topic_id INT NULL 
		);
		""",
        ## Drop the table
        """
		DROP TABLE comments;
		""",
    ]
]
