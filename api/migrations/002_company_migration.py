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
    ],
    [
        ## Insert data into the table
        """
        INSERT INTO company
            (name, img)
        VALUES
            ('Google', ''),
            ('Airbnb', ''),
            ('Amazon', ''),
            ('Spotify', ''),
            ('Nintendo', ''),
            ('Apple', ''),
            ('Meta', ''),
            ('Twitter', ''),
            ('Steam', ''),
            ('Instagram', ''),
            ('Microsoft', ''),
            ('Facebook', ''),
            ('Disney', ''),
            ('Netflix', ''),
            ('Airbnb', '');
        """,
        None,
    ],
]
