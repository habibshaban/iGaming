# iGaming Web

## Setup

Build the shared package first:

```bash
pnpm --filter igaming-shared build
```

## Run

```bash
pnpm --filter igaming-web dev
```

The app runs on `http://localhost:5173`.

## Tests

Run unit tests:

```bash
pnpm --filter igaming-web test
```

Run E2E tests:

```bash
pnpm --filter igaming-web test:e2e
```
