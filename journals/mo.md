5/15- Created an Account table, the team pulled from my branch so everyone has the table. We are going to soley do merge reqeusts from here on out. I later changed my account routers and queries to set up auth, but was getting errors

5/16- Setting up Auth is complete. Devs can now create, login, and logout accounts in the backend. Will add a front end page to login tomorrow and set up protected endpoints for pages that need to be signed in for.

5/17- Created a Signup Page at /signup, fixed nav bar links, changed div class "container" in app.js to container-flex to get rid of the empty space on side of page.

5/22- Set up protected endpoints in the back end to allow for checking if current logged in user is authorized.

5/23- Realized I did the auth wrong for the front end

5/24- Fixed backend auth and endpoints, Front end auth is almost working, but there seems to be no connection with the backend, it connects to localhost 3000 for some reason

5/25- fixed front end auth, it was connecting to localhost3000 becuase the baseURL wasnt taking from the YML and im not sure why but I changed it to 8000 and all is good.

5/26- started creating a pop out window modal for users to sign in

5/30- finished creating a pop out modal for the home page that allows users to sign in. Started a Logout button for the NAV where it doesnt redirect to the page, instead the app checks if your currently signed in and if so, it renders a logout button. Finsihed that feature as well. Started working on full CRUD ops for a replies table for only the backend for now

5/31- Finished creating a replies table, all of its queries and routes for all CRUD ops. Everything is working. Starting a new feature branch today to work on editing the account info for both the back and front end. Plans to integrate Jonathans Employee form component into this page as well and make it into a profile page. Other than this, Im trying to help jonathan with his docker issues. We are unable to test his code for bugs react will not refresh more than once, and docker refuses to die despite trying to kill all processes associated with docker. we think its a RAM allocation issue. Help me understand thread has been posted.

6/1- Finshed up the backed queries for updating account info. Turns out my error was attributed to an extra comma in my SQL query. I created a front end page for the user to update their account. The page first pulls data of the current account info and populates the form. The user can then edit the fields. After editing the fields, the user can type in their current or their new password. They must then confirm that password in order to submit.

6/2- I was having a different error where a user wasnt able to sign in after updating their account. It turns out, when updating the account, I have to re-hash the password being updated. This is fixed now. I made a new feature today, It was the ability for users to post a comment to a topic. The most challenging portion was getting the page to refresh the comment list upon submission so the new comment is there.

6/5- Created a unit test today, not sure if its correct but I asked the team to take a look. We are going to try deployment today.

6/6- We are trying front end deployment today. Running into some ESLINT errors. Trying to fix.
