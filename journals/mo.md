5/15- Created an Account table, the team pulled from my branch so everyone has the table. We are going to soley do merge reqeusts from here on out. I later changed my account routers and queries to set up auth, but was getting errors

5/16- Setting up Auth is complete. Devs can now create, login, and logout accounts in the backend. Will add a front end page to login tomorrow and set up protected endpoints for pages that need to be signed in for.

5/17- Created a Signup Page at /signup, fixed nav bar links, changed div class "container" in app.js to container-flex to get rid of the empty space on side of page.

5/22- Set up protected endpoints in the back end to allow for checking if current logged in user is authorized.

5/23- Realized I did the auth wrong for the front end

5/24- Fixed backend auth and endpoints, Front end auth is almost working, but there seems to be no connection with the backend, it connects to localhost 3000 for some reason

5/25- fixed front end auth, it was connecting to localhost3000 becuase the baseURL wasnt taking from the YML and im not sure why but I changed it to 8000 and all is good.
