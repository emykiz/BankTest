# Bank Test api

## Quick Start

To install a project, simply run:

```bash
npm install
```

Or

```bash
yarn install
```

## Table of Contents

- [Features](#features)
- [Commands](#commands)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Error Handling](#error-handling)
- [Contributing](#contributing)


## Commands

Running locally:

```bash
yarn dev or npm run dev
```

Running in production:

```bash
npm start or npm run start
```

Testing:

```bash
# run all tests
npm test

# run all tests in watch mode
npm test:watch

```

Docker:

```bash
# run docker container in development mode
yarn docker:dev

# run docker container in production mode
yarn docker:prod

# run all tests in a docker container
yarn docker:test
```


## Project Structure

```
src\
 |--controllers\    # Route controllers (controller layer)
 |--entities\       # models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--app.js          # Express app
 |--index.js        # App entry point
```

## API Documentation

To view the list of available APIs and their specifications, run the server and go to `http://localhost:3000/` in your browser. 

## Error Handling

The app has a centralized error handling mechanism.

Controllers should try to catch the errors and forward them to the error handling middleware (by calling `next(error)`).



To modify the MySql configuration, update the `.ormconfig.json` file. To modify the typescript configuration, update the `.tsconfig.json` file.

