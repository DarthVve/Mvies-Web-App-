
# MVIES

Mvies is a full stack web application which implements a RESTful API. <https://mvies.herokuapp.com/movies> (This link may be unavailable in future).

It is a movie listing website where users can signup/register, login, and have listings which they can perform CRUD operations on.

In this case we are dealing with movies, users can create a movie after sign up and login by adding a title, description, image url, and price which they would typically sell the movie for (no such functionality exists at the moment).

The created movies can be edited and deleted by the user which created them. Movies from all users are displayed on the homepage.

NB: This is just a personal project, as time passes more functionalities may be added. Pardon my views as well (improvements will be made), believe me it can be way better I just threw this together. For now I'm swarmped #lifeOfaDev :(

## Documentation

For this project I employed express, node.js, typescript, & javascript, for the backend end I employed
express' view engine (ejs) with the addition of HTML and CSS of course for the frontend and SQLlite is used as the database solution for persisting data.

To understand how the API works check the documentation below. For security reasons not all routes were included within the frontend, user data can only be modified from the backend or database services.

[API Documentation](https://documenter.getpostman.com/view/22485653/VUjSHQDr)

## Deployment

Assuming you have cloned the repo to your local machine, you want to
run the following commands in your terminal:

```bash
  npm i && npm start
```

OR

```bash
  yarn && yarn start
```

This will install the application's dependencies and start the app on port 3000 of your machine, access this by inputting this url; <http://localhost:3000/movies> on your browser.

NB: You will not see any movies to optimize space the database is empty, so you'll need to login as a user and create. Do not forget you can't upload images directly they must be URLs.

If you feel like playing around in your own version of the repo do not forget to compile,
you can also start your server using nodemon, which restarts everytime you make changes. To achieve this run:

```bash
  npm run tsc && npm run dev
```

OR

```bash
  yarn tsc && yarn dev
```

Additionally if you are familiar with containers I have added the necessary files to containerize your application using docker. You can use any tooling of your choice or edit the Dockerfile as you see fit.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

JWT_SECRET=rnnffcadacuwrvrvwivnanavmfbrvnwrfqvqv;

## Authors

- [Vve](https://www.linkedin.com/in/viremaj/)
