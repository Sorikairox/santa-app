## Description

This project is an exercice for ALJ. It is made with [Nest](https://github.com/nestjs/nest) framework for the following reasons : 

<ul>
<li> Domain Driven Design
</li>
<li> Dependency Injection (DI) pattern which is an Inversion Of Control technique (IoC). Making unit testing a piece of cake.
</li>
<li> Made for and with Typescript. I like my code typed.</li>
<li>Uses annotation, devs that use Java would easily understand Nest</li>
<li>Last but not least. I like it</li>
</ul>


## Objectives overview:

The webapp should display a form for children to enter their id and a free text message to santa.

When submitting the form, the server should check:
1. that the child is registered
2. that the child is less than 10 years old.
   To this purpose, the server can fetch user and profiles data in JSON format from:
- https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json
- https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json

If the child is not registered (no match for the user id) or more than 10years old, the webapp should display a basic error page with an error message explaining the problem.\
If the child is registered and less than 10 years old, the server should show a page indicating that the request has been received.

Every 15seconds, the server should send an email with information on all pending (not yet sent) requests including:
- child username (eg. charlie.brown)
- child's address (eg. 219-1130, Ikanikeisaiganaibaai, Musashino-shi, Tokyo)
- request free text as was input in the form

Email sender should be set as do_not_reply@northpole.com, and sent to santa@northpole.com

## Tips and detailed instructions:

- somebody started to work on the app, but left it unfinished. It is up to you to complete it. You are allowed to restart from scratch if you prefer.
- the look and feel of the application for this challenge is not the priority. The pages/email do not need to look good, as long as they convey the information effectively.
- you should fetch the JSON data at every form submission (consider it as an API)
- for the sake of the challenge, you can keep the requests in-memory only
- you are encouraged to select and use npm packages as needed (you can add packages by editing package.json, or using `npm install` from the glitch console)
- to get an smtp server for emails, go to https://ethereal.email/ and click "Create Ethereal Account".\
  This will give you an account (take note of your username and pwd if you need to re-logon later) and smtp server (actual emails do not get delivered).\
  Go to https://ethereal.email/messages to see the emails that have been received by the smtp server.



## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest framework itself is [MIT licensed](LICENSE).<br>
This project code is [unlicensed](LICENSE)
