# Summary

- [Description](#description)<br>
- [Installation](#installation)<br>
- [Running the app](#running-the-app)<br>
- [Test](#test)<br>
- [Architecture choice](#architecture-choice)<br>
- [Isn't it overkill ?](#isn-t-it-overkill-)<br>
- [Objectives overview](#objectives-overview)<br>
- [Tips and detailed instructions](#tips-and-detailed-instructions)<br>
- [License](#license)

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

## Installation

```bash
$ npm install
```

## Running the app

```bash
# prod
$ npm run start

# watch mode
$ npm run start:watch

# dev mode
$ npm run start:dev
```

## Test

```bash
# unit tests
$ npm run test

# integration tests
$ npm run test:integration

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Architecture choice

### CSRV ?

I did not want to create a `Single-Page-Application (SPA)`  to display different page, I opted for `Server-Side-Rendering (SSR)` after building the whole API.<br>

Therefore, the end result is built with a `Controller-Service-Repository-View` pattern.

### Repository vs Store 

For the test's sake, I decided to create a `IStore` without data persistence after being retrieved. However, in real life situation with a Database, I would have created a `IRepository` and set a `sent` attribute to true.

### SantaRequestSender and Sender abstraction

Right now, we are using email to send Santa's request via `EmailSender`. Maybe the specs change at some point and we need to send them via websocket or phone text message or any other mean. <br><br>
We will simply have to implement a `PhoneTextSender` class, and change `SantaRequestSender` parent class for it to work without any change to `SantaRequestSender` usage.

### Commit style

I try to stick to [Karma Convention](http://karma-runner.github.io/6.3/dev/git-commit-msg.html) spec : <br>

```
<type>(scope): <description>

[optional body]

[optional footer(s)]
```

### Test suites

Tests cover 90+% of code that is not related to view rendering or Nest configuration.

### No comments in code ???

A well written code does not need comments to be understood excepted for complexes business algorithms. If you don't understand my code by reading it or/and are unsure of what it's doing, then I failed and I'm sorry.

## Isn't it overkill ?

We could discuss the fact that this is a lot of files and code for a simple challenge, and maybe a lot of [You Aren't Gonna Need It](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it). <br>
However I decided that it was better to show that I can create clean code with abstractions, test, relevant design pattern, rather than showing that I can do it quick and dirty.<br>


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
  
## License

Nest framework itself is MIT licensed.<br>
This project code is unlicensed (LICENSE)
