# Koala42 - Technical Assessment (Backend)
*Backend API implementation for a database with nested structure and statistical data.*

> This repository is part of a technical assessment task provided by Koala42.

## Table of Content
- [Introduction](#introduction)
- [Tech Stack](#tech-stack)
- [Deployment](#deployment)
- [Important Information](#important-information)
- [Reflection](#reflection)
- [Questions](#questions)

## Introduction
This is a simple REST API that connects to a PostgreSQL database and exposes a single endpoint: `/characters` that:
- Fetches character data in a nested JSON structure including their nemeses and secrets.
- Provides statistical data such as count, average age, average weight, and gender distribution.

## Tech Stack
- **Backend Framework**: Express.js
- **Programming Language**: TypeScript
- **Database**: TypeORM
- **Logging**: Pino, Pino-Pretty
- **Documentation**: Swagger UI, Swagger-parser
- **Environment Variables**: dotenv
- **Code Quality**: Prettier
- **Testing**: Mocha, Chai, Supertest
- **Environment**: Docker

## Deployment
1. Clone the repository:
    ```bash
    git clone https://github.com/Shimmyland/nodejs-koala42-tech-assessment.git
    ```
2. Navigate to the project directory:
    ```bash
    cd <project-name-folder>
    ```
3. Create `.env.prod` and `.env.test` files based on `.env-example`
4. Run the API:
    ```bash
    npm run api         # Run API localy, connect to external DB
    npm run api:docker  # Run API in Docker Container, connect to external DB
    ```

## Important Information
- Proper configuration of `.env` files is essential for smooth operation.
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) is required to run the project using Docker.
- API documentation is available at `/api-docs` (runtime).
- Use [Postman](https://www.postman.com/downloads/) to test endpoints (recommended).
- Uses external PostgreSQL instance (can also run DB locally via Docker with `npm run test:db`).
- TypeORM handles database entity mapping.
- Run the tests with `npm run test:run` 

## Known Issues
**Validation**: Even though the `/characters` endpoint doesn’t accept any parameters or query strings, I’d still add a simple validation middleware to explicitly reject anything unexpected — *better safe than sorry*. (AJV package, return 400)

**Pagination**: Currently, the endpoint returns everything all characters, their nemeses, and their secrets in one big nested JSON blob. That’s fine for small datasets, but if the database ever holds thousands of records... *well, you probably don’t want to accidentally DDoS yourself*. Lazy Loading (e.g., pagination) would definitely be needed to keep things fast and stable.

**Serialization and Mapping**: The response structure right now mirrors the database entities directly. I skipped serialization and DTOs to save time and because of the returned data structure showned in example. In a production app, I’d use DTOs to explicitly shape the output and avoid leaking unnecessary internal structure. Also i some manual type mapping but i'm not sure if it was needed.

**Migration**: Since the database was externally hosted (and not mine), I chose not to implement migrations here. (*No surprise `typeorm_migrations` tables sneaking in.*) In a real setup, I’d try to include TypeORM migration handling with environment-specific configs.

**Test Coverage**: I wrote a simple integration test to show how I’d approach testing in this project. Since the `/characters` endpoint contains very little logic, I didn’t find much else worth testing. In a larger app, I’d definitely write more unit and integration tests.

**Caching with Cron**: If the data were large or expensive to compute, I’d consider adding caching via Redis, and maybe a cron job to periodically fetch and store it in a more efficient structure. This wasn’t necessary for the current use case but could be added for scale. Theoretically, i have no experience with this yet.

## Reflection
**Time management**: Could I have used my time better? Probably. But I focused on keeping the core logic clean and ensuring the endpoint was solid and reliable.
- Project Structure & Setup: ~1h
- Models & Database: ~4.5h
- Endpoints & Business Logic: ~1.5h
- Testing & Debugging: ~2.5h
- Documentations (Swagger & README.md): ~2.5h

> **Models & DB**: This was my first time using TypeORM, so I spent ~2.5h reading the official documentation. I have previous experience with Sequelize, but I found it somewhat limiting and wanted to try a solution based on decorators.

> **Debugging**: I encountered issues when trying to run tests – the cause turned out to be a misconfigured `POSTGRES_HOST` in my `.env.test` used in `docker-compose.yml`, which prevented the test environment from connecting to the correct database. 

## Question
- Which technologies would you choose and why?
- How would you approach this assignment? What would you do differently?
- How would you allocate time for this assessment?
- What’s your opinion on my `tsconfig.json` and `tsconfig.build.json`? I’d love some feedback. (i’m self-taught)
- Are there better package versions I should’ve considered, or things I missed?


> ⚠️ **Note:** Some parts of this README.md have been written with the help of AI – the author prefers writing code over writing English.