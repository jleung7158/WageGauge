steps = [
    [
        """
		CREATE TABLE replies (
			id SERIAL PRIMARY KEY NOT NULL,
            comment_id INT NULL,
			account_id INT NULL,
			topic_id INT NULL,
			text VARCHAR(5000) NOT NULL
		);
		""",
        """
		DROP TABLE replies;
		""",
    ]
]
