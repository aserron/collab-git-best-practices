# Slim Express API

A minimal Express REST API for demonstrating Git best practices.

## Features

- Express.js server with basic setup
- Health check endpoint
- Error handling middleware
- Jest testing setup
- ESLint configuration
- Environment variable support

## Prerequisites

- Node.js >= 14
- npm or yarn or pnpm

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```
3. Copy `.env.example` to `.env` and adjust the configuration if needed

## Development

Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Testing

Run the test suite:
```bash
npm test
# or
yarn test
# or
pnpm test
```

## Linting

Run the linter:
```bash
npm run lint
# or
yarn lint
# or
pnpm lint
```

Fix linting issues:
```bash
npm run lint:fix
# or
yarn lint:fix
# or
pnpm lint:fix
```

## API Endpoints

### Health Check
- `GET /health`
  - Returns server status and current timestamp
  - Response: `{ status: 'ok', timestamp: '2023-09-21T12:00:00.000Z' }`

## Git Best Practices

This project demonstrates various Git best practices:

1. **Branching Strategy**
   - `main`: Production-ready code
   - `dev`: Development branch
   - Feature branches: `feature/*`
   - Bugfix branches: `bugfix/*`

2. **Commit Messages**
   - Follow conventional commits format
   - Example: `feat: add health check endpoint`

3. **Code Review**
   - Pull requests required for all changes
   - Code review checklist
   - Automated tests must pass

4. **Version Control**
   - Semantic versioning
   - Changelog maintenance
   - Release notes

## Contributing

1. Create a feature branch from `dev`
2. Make your changes
3. Write/update tests
4. Run linting and tests
5. Create a pull request
6. Get code review
7. Merge after approval

## License

MIT 