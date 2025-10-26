# iGaming

## Setup

Install dependencies:

```bash
pnpm install
```

Build the shared package:

```bash
pnpm --filter igaming-shared build
```

## Run

Start both backend and frontend:

```bash
pnpm dev
```

Or run them separately:

**Backend:**

```bash
pnpm --filter server dev
```

**Frontend:**

```bash
pnpm --filter igaming-web dev
```

The backend runs on `http://localhost:3000` and frontend on `http://localhost:5173`.
