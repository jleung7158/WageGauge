steps = [
    [
        # Create the Table
        """
        CREATE TABLE topic_likes (
            id SERIAL PRIMARY KEY NOT NULL,
            account_id INT NULL,
            topic_id INT NULL
        );
        """,
        # Drop the Table
        """
        DROP TABLE topic_likes;
        """,
    ]
]
