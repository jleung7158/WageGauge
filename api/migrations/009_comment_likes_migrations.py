steps = [
    [
        # Create the Table
        """
        CREATE TABLE comment_likes (
            id SERIAL PRIMARY KEY NOT NULL,
            account_id INT NULL,
            comment_id INT NULL
        );
        """,
        # Drop the Table
        """
        DROP TABLE comment_likes;
        """,
    ]
]
