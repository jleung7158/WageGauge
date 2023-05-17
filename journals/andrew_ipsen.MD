05/15/23
Most of today was spent detailing workflow and delegating work to different members. The issue i'm currently working on is creating the Company table and its endpoints.

05/06/23
Starting today, I have a working Company table. It exists in its own migration file, which we may decide to combine with other tables so that we can reference them when needed.

By the end of today, all CRUD endpoints for Company are functioning, and the table is working as well. I've completed the merge request to merge to main.

05/17/23
I've added Company to the frontend, creating a path in the React App to show the table data from the Company table.
I've also changed the Company table to exclude a position_id, because we're flipping our logic to join Company to the Positions Table.

Visx and d-3 have also been installed.
