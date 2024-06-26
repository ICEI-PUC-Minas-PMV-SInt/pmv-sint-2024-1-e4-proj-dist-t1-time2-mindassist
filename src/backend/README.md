# New Project Template

This template serves as a starting point for any new projects using a specific set of technologies and dependencies. It is designed to streamline the setup process and ensure consistency across development environments.

## Technologies

This project is built using Node.js with TypeScript and relies on several packages for various functionalities.

### Dependencies

- `@fastify/cors` v9.0.1: CORS support for Fastify applications.
- `argon2` v0.40.1: A library to help hash passwords.
- `date-fns` v3.6.0: Modern JavaScript date utility library.
- `dotenv` v16.4.5: Loads environment variables from `.env` file.
- `drizzle-orm` v0.30.9 and `drizzle-zod` v0.5.1: Lightweight ORM and validation using Zod.
- `fastify` v4.27.0: Fast and low overhead web framework for Node.js.
- `http-errors` v2.0.0: Create HTTP errors for Express, Koa, Connect, etc.
- `pg` v8.11.5: Non-blocking PostgreSQL client for Node.js.
- `pino-pretty` v11.0.0: Pretty logger for Pino.
- `rimraf` v5.0.5: The UNIX command `rm -rf` for Node.js.
- `typescript` v5.4.5: A typed superset of JavaScript that compiles to plain JavaScript.
- `zod` v3.23.5: TypeScript-first schema validation with static type inference.

### Development Dependencies

- `@types/http-errors` v2.0.4: TypeScript definitions for `http-errors`.
- `@types/node` v20.12.7: TypeScript definitions for Node.js.
- `@types/pg` v8.11.5: TypeScript definitions for `pg`.
- `drizzle-kit` v0.20.17: Toolkit for working with `drizzle-orm` and `drizzle-zod`.
- `eslint` v9.1.1: The pluggable linting utility for JavaScript and JSX.
- `globals` v15.0.0: Globals variables definition for JavaScript.
- `tsup` v8.0.2: Bundler for TypeScript using esbuild.
- `tsx` v4.7.3: TypeScript executor and REPL.

## Setup

To get started with this project, clone the template and install the necessary dependencies:

```bash
git clone https://your-repository-url/project-template.git
cd project-template
npm install
```
