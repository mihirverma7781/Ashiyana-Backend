# Transcript APIs - README

**Version 1.0.0**

Transcript Backend API

![Transcript APIs Logo](logo.png)

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Author](#author)
- [License](#license)

---

## Description

**Transcript APIs** is a versatile backend API package designed to support various transcript application..

---

## Installation

To install the **Transcript APIs** package, follow these steps:

1. Clone the repository from GitHub: `git clone repo-url`
2. Navigate to the project directory: `cd transcript-apis`
3. Install dependencies: `pnpm install`

---

## Usage

You can use **Transcript APIs** for various purposes, such as managing transcripts, sending emails, and working with databases. Here are the primary features:

- Basic User Management
- Project Management

---

## Configuration

Before you start using the package, make sure to configure the environment variables. Create a `.env` file in the root of your project and set the following variables:

- `PORT`: The port on which the server will run.
- `APP_URI`: The URI of your application.
- `NODE_ENV`: The environment (development, production, etc.).
- `DB_URI`: The URI of your database.
- `REDIS_URI`: The URI for your Redis instance.
- `ACCESS_TOKEN`: Access token secret.
- `ACCESS_TOKEN_EXPIRE`: Access token expiration time (e.g., 1h, 1d).
- `SMTP_HOST`: SMTP server host for sending emails.
- `SMTP_SERVICE`: Service for sending emails.
- `SMTP_MAIL`: Email address used for sending emails.
- `SMTP_PASSWORD`: Email password for sending emails.
- `AWS_ACCESS_KEY`: AWS access key.
- `AWS_SECRET_ACCESS_KEY`: AWS secret access key.
- `AWS_S3_BUCKET_NAME`: AWS S3 bucket name.

---

## Scripts

**Transcript APIs** provides the following NPM scripts to streamline development:

- `start`: Start the server using `ts-node-dev`.
- `dev`: Start the server with automatic restart on code changes.
- `test`: Run tests using `ts-node-test`.
- `build`: Build the project using TypeScript.

To execute a script, use the following command: `pnpm run <script-name>`.

---

## Dependencies (I am using pnpm as package manager)

This package relies on several dependencies to function correctly. Here are the key dependencies used in **Transcript APIs**:

- `@aws-sdk/client-s3`: Amazon S3 SDK for Node.js.
- `@google-cloud/storage`: Google Cloud Storage SDK.
- `@types/aws-sdk`: TypeScript definitions for AWS SDK.
- `@types/bcryptjs`: TypeScript definitions for bcryptjs.
- `@types/cookie-parser`: TypeScript definitions for cookie-parser.
- `@types/cors`: TypeScript definitions for CORS.
- `@types/ejs`: TypeScript definitions for EJS templating engine.
- `@types/express`: TypeScript definitions for Express.js.
- `@types/express-serve-static-core`: TypeScript definitions for Express.js core.
- `@types/jsonwebtoken`: TypeScript definitions for JSON Web Tokens.
- `@types/multer`: TypeScript definitions for multer.
- `@types/multer-s3`: TypeScript definitions for multer-s3.
- `@types/node`: TypeScript definitions for Node.js.
- `@types/nodemailer`: TypeScript definitions for Nodemailer.
- `@types/uuid`: TypeScript definitions for UUID.
- `aws-sdk`: Amazon Web Services SDK.
- `bcryptjs`: Library for hashing passwords.
- `cookie-parser`: Middleware for handling cookies.
- `cors`: Middleware for handling Cross-Origin Resource Sharing.
- `dotenv`: Load environment variables from a .env file.
- `ejs`: Embedded JavaScript templating engine.
- `express`: Web application framework.
- `ioredis`: Redis client for Node.js.
- `jsonwebtoken`: JSON Web Token implementation.
- `mongoose`: Object Data Modeling (ODM) library for MongoDB.
- `multer`: Middleware for handling file uploads.
- `multer-s3`: Multer storage engine for AWS S3.
- `nodemailer`: Node.js module for sending emails.
- `ts-node-dev`: Development server with TypeScript support.
- `typescript`: TypeScript language.
- `un`: A utility package for your project.
- `uuid`: Generate and parse UUIDs.

---

## Author

**Mihir Verma**

- GitHub: [mihirverma7781](https://github.com/mihirverma7781)

---

## License

This project is licensed under the **ISC License**. See the [LICENSE](LICENSE) file for details.

---

Thank you **Transcript APIs**! Happy coding! 🚀
