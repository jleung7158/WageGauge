05/15/23
Most of today was spent detailing workflow and delegating work to different members. The issue i'm currently working on is creating the Company table and its endpoints.

05/06/23
Starting today, I have a working Company table. It exists in its own migration file, which we may decide to combine with other tables so that we can reference them when needed.
By the end of today, all CRUD endpoints for Company are functioning, and the table is working as well. I've completed the merge request to merge to main.

05/17/23
I've added Company to the frontend, creating a path in the React App to show the table data from the Company table.
I've also changed the Company table to exclude a position_id, because we're flipping our logic to join Company to the Positions Table.
Visx and d-3 have also been installed.

Week 15

05/22/23

Over the weekend, I spent a long time getting familiar with TailwindCSS. I was able to make some design decisions on the nav bar and the dashboard, which included consistent color palettes and shapes. I've also created a functioning dashboard table that displays available positions grouped by their company. A user can also direct to the company detail page from that companny table.

05/23/23

Today, I'm working on introducing a darkmode toggling functionality. I'm following resources from TailwindCSS, and if implemented successfully, can be applied to the whole application.
I also tackled the Topics backend. I created the table migrations and made all the endpoints.
The joins have not been written yet, which are essential to the topics page, as we will need to connect users and comments to posts.

05/24/23

Today, I'm finalizing the dark mode color palette. I would like to hammer out the containers/sections layout of the dashboard as well. keeping the layout nice and pretty has been a struggling point for me. By the end of the day, we should also have front end auth too.
I separated the "Know Your Worth" banner to it's own file to clean up the component organization.

Week 16

05/30/23

Today I tackled the profile dropdown menu. Upon logging in, the "Login" button disappears and is replaced with a dropdown "Profile" button, where one can find a button to the Account page, and the Logout button. The challenge has been getting the page to refresh once the logout button has been pressed, revealing the login button again and redirecting back to the dashboard.


05/31/23

Today I took on the challenge to connect the dashboard to the positions page more directly. There is a "Learn More" button connected to each company table in the Dashboard, and the plan was to direct the user to the positions page (which is a single page that contains all the data for every company) and open to the filtered data of the respective company.
A achieved this by sending {company} via state on the Link button, which can be accessed with useLocation on the other side.
