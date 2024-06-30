# Demo Credit Service

A comprehensive credit service API built with Node.js, Express, KnexJS ORM, MySql and Typescipt for managing user accounts, transactions, and authentication.
It is demo a mobile lending app that requires wallet functionality. This is needed as borrowers need a wallet to receive the loans they have been granted and also send the money for repayments.

## Table of Contents

- [Demo Credit Service](#demo-credit-service)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
    - [Migration](#migration)
    - [Seeding](#seeding)
      - [Seed Order](#seed-order)
    - [Database E.R Diagram](#database-er-diagram)
  - [Running the App](#running-the-app)
  - [API Documentation](#api-documentation)
  - [Testing](#testing)
    - [Explanation](#explanation)
  - [Reasons for my stack](#reasons-for-my-stack)
  - [Author](#author)
  - [License](#license)
  - [Disclaimer](#disclaimer)

## Features

- User authentication (sign-up, sign-in)
- Wallet management (fund, withdraw, transfer)
- Transaction history
- Secure password hashing and JWT-based authentication
- Input validation with DTOs and class-validator

## Requirements

- Node.js (>= 20.13.1)
- KnexJS ORM
- MySql
- Typescript

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/m-azra3l/demo-credit-service.git
   cd demo-credit-service
   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

## Environment Variables

Create a `.env` file in the root directory of the project by renaming the `.env.example` and configure the following environment variables:

```
ADJUTOR_BASE_URL=your-adjutor-base-url
ADJUTOR_SECRET_KEY=your-adjutor-secret-key
API_PORT=your-api-port
AUTH_SECRET=your-secret-key
DATABASE_HOST=your-database-host
DATABASE_NAME=your-database-name
DATABASE_PASSWORD=your-database-password
DATABASE_PORT=your-database-port
DATABASE_USERNAME=your-database-username
LOG_FORMAT=your-custom-format
NODE_ENV=your-environment
SALT_ROUNDS=your-salt-rounds
TOKEN_EXPIRATION=your-token-expiration
```

## Database Setup

### Migration

To create the database schema, run the following Knex migration command:

```bash
npx knex migrate:make specific_table_name
```

```bash
npx knex migrate:latest
```

### Seeding

To seed the database with initial data, run the following Knex seed command:

```bash
npx knex seed:run --specific=specific_file.ts
```

#### Seed Order

The following order should be followed to avoid conflicts while seedind database:

- Seed User
- Seed Wallet
- Seed User Transaction
- Seed Transaction

### Database E.R Diagram

ER

## Running the App

To start the application, use the following command:

```bash
npm start
# or
yarn start
```

The server will start on the port specified in the `.env` file (`API_PORT`).

## API Documentation

API documentation is generated using Swagger. To view the API documentation, navigate to the `/api-docs` endpoint in your browser after starting the server.

- [Swagger API Doc](https://michael-adesina-lendsqr-be-test.onrender.com/api-docs/)

## Testing

To run the tests, use the following command:

```bash
npm test
# or
yarn test
```

This will execute all unit and integration tests using Jest and Supertest.

Enjoy using the Demo Credit Service API! Feel free to contribute or open issues if you find any bugs.

### Explanation

- **Features**: A list of key features in the application.
- **Requirements**: Lists the prerequisites for running the application.
- **Installation**: Instructions to clone the repository and install dependencies.
- **Environment Variables**: Details on setting up environment variables.
- **Database Setup**: Commands to run migrations and seeds.
- **Running the App**: Instructions to start the server.
- **API Documentation**: Information on accessing the Swagger-generated API documentation.
- **Testing**: Commands to run the test suite.

This `README.md` should provide a comprehensive guide for setting up and running your application.

## Reasons for my stack

Check out the reasons for my tech stach [here](https://docs.google.com/document/d/1PM40WUCgjCeqcQdybVBCccpqxkOjrM2S4bgOC4L1ObM/edit?usp=sharing).

## Author

[Michael](https://github.com/m-azra3l)

## License

This project is licensed under the [MIT License](LICENSE).

## Disclaimer

This project is but an example project, it is not for the purpose of commercial use.
