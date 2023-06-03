05/15/23
Today, I worked on a Position model that will be assigned to various companies. I also started on a simple React page for the company detail (no content, just framework).
The Position model will have the title of the position, the position level in the company, the years in that position, an optional notes field on their journey in that position, and a small description of the job as the fields. Each position will have a list of salaries attached to it, to calculate statistics and data.
The React page will have a sidebar with a list of positions in that company, with a sort and search function. Clicking on one position will bring up graphical data for the position, which will be over a 5 year time span, and be seperated by the level of that position.

A list of features/issues that you worked on and who you worked with, if applicable
A reflection on any design conversations that you had
At least one ah-ha! moment that you had during your coding, however small

I need to discuss with the group about how to implement the salary though.

As for aha! moments, I had one while coding the FastAPI routers: they basically combine the views and urls together from django!

5/16/23
Today, I added Tailwind CSS to our React app. It should be fun to use for styling. I started on a simple React page for the company detail (no content, just framework) and will be messing around with styling for the rest of the day.

The React page will have a sidebar with a list of positions in that company, with a sort and search function. Clicking on one position will bring up graphical data for the position, which will be over a 5 year time span, and be seperated by the level of that position.

We didn't discuss much, and as for aha! moments I basically only had one noticeable one for Tailwind: no need for huge custom css classes.

5/17/23
Today, I'm working on adjusting my positions database to account for company SQL JOIN's as well as more styling via Tailwind.

We discussed how specifically to implement the positions and company databases to help with the salary db.

As for aha! moments, not many today. It was cool to see how h-screen works in Tailwind I guess?

5/18/23
Today I'm working on solving more joins for our database and more styling. We're going to join employee with company and position. We also resolved merge conflicts.

We discussed future organizational methods to reduce future method conflicts.

As for aha! moments, I figured out how to send data via props with a button click, so that was cool.

5/19/23
Today I worked on setting up the front-end framework for the company detail page, so that I can fill it with data collected later.

We discussed potentially using redux but saved that for after we get the back-end fully functional.

For aha! moments, it was really cool figuring out how to connect data between child and parent components for the front-end, though I think redux will be doing that too.

5/22/23
Today we worked on joining the positions and employees database. I will be working on implementing redux into the company detail page.

We decided to stick to Andrew's styling lead.

For aha! moments, I figured out how to transfer data between parent-child and child-parent components in React... but also now know it's way better to do with Redux.

5/23/23
Today was all Redux and RTK Query, I managed to get them done! Mo's birthday was today (happy birthday Mo!) so we tabled handling the auth for some other day. I did get it started on my page though.

We planned out how to start the topics endpoint, as well as how to implement our auth in the back/front-end.

For aha! moments, while I was trying out state control with redux things kind of just clicked, and I realized how the global state was handled. Made code a LOT cleaner IMO.

5/24/23
Today we finished up setting up front-end auth, still need to test and connect with back-end auth.

5/25/23
We ran into issues with Andrew's docker + code, so had to revert changes. Most of the day was on that.

5/26/23
Today was pretty chill, I basically did stylistic changes and cleaned up some code of mine. Long weekend ahead + wedding = a little less work done.

5/29/23
Today I set up the comment's database and queries+routers. I also wrote out the framework for the forum page.

Not much aha! moments, basically just the same type of work previously done.

5/30/23
Today I set up the framework for the topic page. It's capable of displaying the specific topic clicked on from the forum page, as well as that topic's comments.

Replies (DB and endpoints) will be handled by Mo, so I will be waiting on that.

My big aha! moment was learning and properly using the useParams hook, that was cool.

5/31/23
Today I finished setting up the Topic page, it just needs to be fleshed out with data and features now. I also managed to make my company detail page default to a company from the dashboard.

My big aha! moment was connecting the redux with the react states in my company dropdown, to allow for the default on load.

6/1/23
Today I helped Jonathan with adding features to Employees so that we can add it to the figures. I also stylized my company detail, forum, and topic page.

I am adding the math and data to the figures tonight, as well as more styling.

A bunch of little aha! moments refactoring the math code to be cleaner using dictionarys and arrays as opposed to repetitive let statements.

6/2/23
Today I finished setting up a form to post a new topic in the forum page. I had to adjust the migration files and queries but that was simple enough. I also added a search function to the forum page.

I plan on adding a company filter function to filter topics by company as well. Then add more styling, and maybe add a user name.

As for aha! moments, it was nice to finally program the automated refetch via redux for my forum page.
