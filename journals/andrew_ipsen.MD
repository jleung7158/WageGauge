Week 14

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

06/01/23

Today, I completed the database structures for the likes. I decided that each object that likes will exist on should have their own likes table: Topics Likes table, Comments Likes table, and Replies Likes table. Each table only consists of its id, account_id, and id of the object. The endpoints include a post, a get all and delete.

I also designed out a simple about us page. It exists with four cards consisting of a profile picture, title and links to their respective gitlabs and linkedins.

Week 17

06/05/23

Over the weekend, I completed the task of converting our company tables on the dashboard to cards. It looks much cleaner. I've also added a field for an image url for the company, and created a JS file that house an object of img urls linked to Company names, so if someone added a company and didn't include an URL for the image, the Dashboard will compare the name of the company added with the keys in the object, and if there's a match, use the URL in the value to populate the Company image.

06/06/23

Today, our app is half deployed. I've adjusted the navbar to include an "update account" button and "report your salary" button to the profile dropdown menu. Today, I will be trying to implement a unit test for a company post. I also want to research how to properly implement a functional dashboard button feature, that changes what is displayed based on the button pressed.

06/07/23

Today, I've successfully implemented data inserts to the company table migrations, so upon building the database there will automatically be companies to display.
