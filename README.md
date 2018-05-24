# A NextJS sandbox

## Requirements
This project requires [Docker Compose](https://docs.docker.com/compose/overview/) to develop and test. The [Yarn](https://yarnpkg.com) package manager is also required, and is used instead of `npm`.

## Runnning
1. Clone repository
2. Override any applicable development environment variables (see [Environment Variables](#environment-variables) below)
3. In the project root, run `yarn start`
4. The server is now accessible on `localhost:3000` (or whatever port you configure)

## Interactive Terminal
You can load an interactive terminal for the app container via `yarn terminal`. This will allow you to add, remove, or upgrade project dependencies using Yarn (among other things). Note: _the application instance must be running via `yarn start` for the terminal to load._

## Environment Variables
Production environment variables are *not* under version control, per [Part 3 of the 12 Factors](https://12factor.net/config). As such, the [dotenv](https://www.npmjs.com/package/dotenv) package is used to manage your variables locally.
1. Create a `.env` file in the project root (at the same level as the `package.json` file)
2. Set (or change) values for the following variables:
```ini
APP_PORT=3000

DEBUG=express:*
```
