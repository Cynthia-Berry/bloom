# Bloom Application

Momint assessment test - An API infrastructure for a social media application Payment Services

- Version 1.0.0: 24th June 2022
- Version 1.0.3: 26th June 2022

## Available Scripts

Run `node app.js` or `npm run dev` ( that is,`nodemon`) for a dev server. Navigate
to [http://localhost:5000](http://localhost:5000).

Important Note:
The app will automatically reload if you run `nodemon` or `npm run dev` (I have configured this command to help run
nodemon as my development server) when you change any of the source files.

The application won't automatically reload if you run `node app.js`, so, ensure to stop the application using `ctrl + c`
then re-run `node app.js`

## Controlling the Bloom API Process

1) Want to quit your running Node.js server?

You can always do that by pressing `ctrl + c` in the terminal/ command prompt window where you started your server (i.e.
where you ran `node app.js` or `nodemon`).

2) Create a `.env` file and make reference to your database information for the below stated constants so you can run
   this project seamlessly and test the endpoints.

`PORT`
`MONGODB_USERNAME`
`MONGODB_PASSWORD`
`MONGODB_CLUSTER_SUFFIX`
`TOKEN_KEY`

NB: The asteriks values are to be supplied by you in relation to your SQL set up in your local machine.

3) To successfully make a request on secured endpoints use `x-access-token` to set your `JWT`
   header before making a request on postman or any other API testing platform.

## Learn More

You can read more about this assessment test
on [Momint Engineering Interviews](https://momint.notion.site/Fullstack-Test-def92aac6f1d4ad5a20b0ceb357f392e)
.

## Documentation

You can read the documentation on [Bloom API SWAGGER DOCUMENTATION](http://localhost:5000/api-doc/). NB: Ensure the development
environment is running, so you can have access to the swagger documentation.

Alternatively, see the below documentation made with postman for the 4 collections

[//]: # (1&#41; [Authentication]&#40;https://documenter.getpostman.com/view/13595180/UzBmM73C&#41;)

[//]: # (2&#41; [Client]&#40;https://documenter.getpostman.com/view/13595180/UzBmM73D&#41;)

[//]: # (3&#41; [Invoice]&#40;https://documenter.getpostman.com/view/13595180/UzBmM73E&#41;)

[//]: # (4&#41; [User]&#40;https://documenter.getpostman.com/view/13595180/UzBmM77W&#41;)
