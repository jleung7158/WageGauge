steps = [
  [
    ## Create the table
    """
    CREATE TABLE positions (
      id SERIAL PRIMARY KEY NOT NULL,
      name VARCHAR(1000) NOT NULL,
      from_date DATE NOT NULL,
      to_date DATE NOT NULL,
      description TEXT 
    );
    """,
    ## Drop the table
		"""
    DROP TABLE positions;
		"""
  ]
]