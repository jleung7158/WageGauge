steps = [
    [
        # Create the Table
        """
        CREATE TABLE reply_likes (
            id SERIAL PRIMARY KEY NOT NULL,
            account_id INT NULL,
            reply_id INT NULL
        );
        """,
        # Drop the Table
        """
        DROP TABLE reply_likes;
        """,
    ]
]
