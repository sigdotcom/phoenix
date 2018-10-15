# Phoenix
[![Build Status](https://travis-ci.org/sigdotcom/phoenix.svg?branch=develop)](https://travis-ci.org/sigdotcom/phoenix)
[![Coverage Status](https://coveralls.io/repos/github/sigdotcom/phoenix/badge.svg?branch=develop)](https://coveralls.io/github/sigdotcom/phoenix?branch=develop)
> MST-ACM API utilizing Koajs.

## Table of Content
+ [Setup](#setup)
    - [Acquire Google OAuth2 Credentials](#acquire-google-oauth2-credentials)
    - [Installing Docker](#installing-docker)
    - [Installing NodeJS](#installing-nodejs)
    - [Installing a node package manager](#installing-a-node-package-manager)
+ [Running Phoenix](#running-phoenix)
    - [Development](#development)
    - [Production](#production)

## Setup
### Acquire Google OAuth2 Credentials
In order to use Google OAuth2 locally, you must first acquire a client id and
client secret from the [developer
console](https://console.developers.google.com/). Instructions to do so can be
found [here](https://support.google.com/cloud/answer/6158849?hl=en) (follow
steps 1-8). Some notes while following the instructions:
1. If you have never worked with the developer console, you will need a create a
   project. Click the "select a project" button at the top of the page and then
   select "new project".
2. Make a readable project name that you can remember in the future.
3. It may take a couple of minutes to create the initial project.
4. If you still "select a project" at the top of the page after the project was
   created, click this button and reselect the project name you just added.
5. When creating the **OAuth Consent Screen**, none of these values should
   really matter for testing purposes. For production, make sure to re-adjust
   these values or use a different project.
6. As you are creating the OAuth client ID, set **Authorized JavaScript
   origins** and **Authorized redirect URIs** to ``http://localhost:3000`` and
   ``http://localhost:3000/auth/google/callback/`` or ``http://127.0.0.1:3000``
   and ``http://127.0.0.1:3000/auth/google/callback/``, respectively. **NOTE**:
   the ``/auth/google/callback/`` and ``:3000`` parts of the URL will change
   depending on the google callback route and port specified in the
   configuration. When in doubt, you should be able to connect to the backend
   homepage if you put in the **Authorized JavaScript origins** url. The
   **Authorized redirect URIs** should be equal to the ``callbackURL` in
   ``src/middleware/auth.ts``. These values are usually
   ``http://127.0.0.1:3000`` and
   ``http://127.0.0.1:3000/auth/google/callback/``.
7. After completing all steps, make sure to save the client ID and client
   secret. You can always recover them from the web panel if you lose them.

## Installing Docker
See the [docker about page](https://docs.docker.com/install/#backporting) for
docker installation instructions for different platforms.

## Installing NodeJS
To run the backend, we use the NodeJS javascript runtime. Installation
instructions can be found [here](https://nodejs.org/en/download/current/). I
recommend downloading the ``current`` version to support the latest javascript
language constructs.

## Installing a node package manager
There are two main package managers for node: ``npm`` and ``yarn``. I would
recommend installing ``yarn`` for its performance and security improvements over
``npm``. Moreover, all examples and package.json commands will use ``yarn``.
+ ``npm`` comes pre-installed with ``nodejs``.
+ [yarn installation instructions](https://yarnpkg.com/en/docs/install#windows-stable)

## Running Phoenix
### Development
``<acquired_client_secret>`` and ``<acquired_client_id>`` can be acquired in
[Acquire Google OAuth2 Credentials](#acquire-google-oauth2-credentials).
```
# Using ssh (CHOOSE ONE)
git clone git@github.com:sigdotcom/phoenix.git
# Using https (CHOOSE ONE)
git clone https://github.com/sigdotcom/phoenix.git
cd phoenix
yarn install
docker run -p 5432:5432 --name phoenix_db -e POSTGRES_USER=postgres -e POSTGRES_DB=phoenix postgres
GOOGLE_CLIENT_ID=<acquired_client_id> GOOGLE_CLIENT_SECRET=<acquired_client_secret> yarn start:dev
# Open http://127.0.0.1:3000/ in your web browser to see the API
```

### Production
``<acquired_client_secret>`` and ``<acquired_client_id>`` can be acquired in
[Acquire Google OAuth2 Credentials](#acquire-google-oauth2-credentials).
```
# Using ssh (CHOOSE ONE)
git clone git@github.com:sigdotcom/phoenix.git
# Using https (CHOOSE ONE)
git clone https://github.com/sigdotcom/phoenix.git
cd phoenix
yarn install
docker run -p 5432:5432 --name phoenix_db -e POSTGRES_USER=postgres -e POSTGRES_DB=phoenix postgres
yarn build
GOOGLE_CLIENT_ID=<acquired_client_id> GOOGLE_CLIENT_SECRET=<acquired_client_secret> yarn start:prod
# Open http://127.0.0.1:3000/ in your web browser to see the API
```
