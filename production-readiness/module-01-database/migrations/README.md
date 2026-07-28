# PostgreSQL Runtime and Migration Guide

This folder documents the first real database runtime step. It does not replace Prisma migrations; it explains how developers should create and verify them.

## 1. Start Local PostgreSQL

From `production-readiness/module-01-database/`:

```bash
docker compose up -d
```

Use this development connection string:

```text
DATABASE_URL=postgresql://subhakamana:change_me_local_only@localhost:5432/subhakamana_store
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Create Initial Migration

```bash
npx prisma migrate dev --name initial_production_schema
```

This generates a real migration under `prisma/migrations/`.

## 4. Seed Starter Data

```bash
npm run db:seed
```

## 5. Verify Module 1

```bash
npm run verify
```

## 6. Production Deployment Rule

Use this command in production after migrations have been reviewed:

```bash
npx prisma migrate deploy
```

Never use `prisma db push` as the production migration process. Production schema changes must be reviewed, committed, and repeatable.

## 7. Current Status

- Prisma schema exists.
- Seed script exists.
- Verification script passes.
- Local PostgreSQL Docker runtime file exists.
- Real generated migration files still need to be created by running `prisma migrate dev` with PostgreSQL available.
