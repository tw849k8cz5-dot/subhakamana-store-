# PostgreSQL Validation Environment Report

**Date:** 2026-07-16  
**Scope:** PostgreSQL-capable validation environment only. No frontend, POS, checkout, payments, delivery, UI, or business feature changes were made.

## Objective

The objective was to establish a safe non-production PostgreSQL runtime for validating the existing Module 1 database foundation and Module 2 backend implementation against real PostgreSQL.

The requested validation included separate `DATABASE_URL` and `TEST_DATABASE_URL` databases, Prisma Client generation, empty-database migrations, hardened seed verification, backend startup with Prisma repositories, authentication checks, product and inventory checks, rollback tests, concurrency tests, persistence after restart, and all Module 1/Module 2 tests.

## Environment Discovery

The current machine did not have a directly usable PostgreSQL or container runtime available from the shell.

### Commands Checked

```bash
docker --version
docker compose version
podman --version
colima version
brew --version
command -v postgres
command -v initdb
command -v pg_ctl
command -v psql
ls -ld /Applications/Docker.app /Applications/OrbStack.app /Applications/Podman\ Desktop.app
find /Applications /usr/local/bin /opt/homebrew/bin -name docker -o -name postgres -o -name initdb
```

### Results

- Docker CLI: not installed.
- Docker Compose: not installed.
- Podman: not installed.
- Colima: not installed.
- Homebrew: not installed.
- Local PostgreSQL binaries: not installed in common paths.
- Docker Desktop / OrbStack / Podman Desktop apps: not found.
- Existing repo Docker Compose file: present at `production-readiness/module-01-database/docker-compose.yml`, but unusable without Docker.

## PostgreSQL Runtime Attempt

Because Docker and local PostgreSQL were unavailable, a temporary PostgreSQL 16 runtime was attempted under `/tmp/subhakamana-pg`.

### Official Postgres.app Attempt

```bash
curl -L --fail --max-time 300 \
  -o /tmp/subhakamana-pg/Postgres-16.dmg \
  https://github.com/PostgresApp/PostgresApp/releases/download/v2.9.5/Postgres-2.9.5-16.dmg

hdiutil attach -nobrowse -readonly /tmp/subhakamana-pg/Postgres-16.dmg
hdiutil imageinfo /tmp/subhakamana-pg/Postgres-16.dmg
bsdtar -tf /tmp/subhakamana-pg/Postgres-16.dmg
```

### Results

- Official Postgres.app PostgreSQL 16 DMG downloaded successfully.
- DMG mount failed with `hdiutil: attach failed - Device not configured`.
- DMG inspection failed with `hdiutil: imageinfo failed - Device not configured`.
- `bsdtar` could not extract the DMG and returned `Unrecognized archive format`.

## Source Build Attempt

PostgreSQL 16.10 was downloaded from the official PostgreSQL source archive and compiled into `/tmp/subhakamana-pg/pgsql`.

### Commands

```bash
cd /tmp/subhakamana-pg
curl -L --fail --max-time 300 \
  -o postgresql-16.10.tar.bz2 \
  https://ftp.postgresql.org/pub/source/v16.10/postgresql-16.10.tar.bz2

tar -xjf postgresql-16.10.tar.bz2
cd postgresql-16.10
./configure --prefix=/tmp/subhakamana-pg/pgsql --without-readline --without-zlib --without-icu
make -s -j2 world-bin
make -s install-world-bin
/tmp/subhakamana-pg/pgsql/bin/postgres --version
/tmp/subhakamana-pg/pgsql/bin/initdb --version
/tmp/subhakamana-pg/pgsql/bin/psql --version
```

### Results

```text
postgres (PostgreSQL) 16.10
initdb (PostgreSQL) 16.10
psql (PostgreSQL) 16.10
```

The temporary PostgreSQL binaries compiled successfully.

## Database Startup Blocker

The compiled PostgreSQL runtime could not initialize a database cluster because this execution environment blocks the shared-memory system calls required by PostgreSQL on macOS.

### Initial Init Command

```bash
/tmp/subhakamana-pg/pgsql/bin/initdb \
  -D /tmp/subhakamana-pg/live-validation/data \
  -U subhakamana \
  --auth=trust \
  --no-locale \
  --encoding=UTF8
```

### Failure

```text
FATAL:  could not create shared memory segment: Operation not permitted
DETAIL:  Failed system call was shmget(key=5654457, size=56, 03600).
```

### Additional Attempts

PostgreSQL was rebuilt with ICU disabled, then with temporary source adjustments to select `mmap` for dynamic shared memory. This allowed `initdb` to select `dynamic shared memory implementation ... mmap`, but PostgreSQL still attempted to create a small System V shared-memory segment during bootstrap.

The final failure remained:

```text
FATAL:  could not create shared memory segment: Operation not permitted
DETAIL:  Failed system call was shmget(key=5660724, size=56, 03600).
```

POSIX shared memory was also tested and blocked:

```text
shm_open failed: Operation not permitted
```

## Database URLs

The planned isolated local URLs were:

```bash
DATABASE_URL=postgresql://subhakamana@127.0.0.1:55432/subhakamana_store_dev?schema=public
TEST_DATABASE_URL=postgresql://subhakamana@127.0.0.1:55432/subhakamana_store_test?schema=public
```

These URLs were not activated because the PostgreSQL server could not initialize inside the current sandbox.

## Validation Status

The following requested live PostgreSQL validations were not executed because no PostgreSQL server could be started:

- Prisma migrations on an empty development database.
- Prisma migrations on an empty test database.
- Schema comparison against live PostgreSQL.
- Hardened seed execution and verification.
- Backend startup using live Prisma user/session repositories.
- Login, `/auth/me`, logout, revocation, invalid-login, expired-session, and unauthorized-access checks against PostgreSQL.
- Product creation/listing, opening inventory, duplicate SKU rejection, and duplicate barcode rejection against PostgreSQL.
- Inventory listing, stock receiving, cost update, and movement creation against PostgreSQL.
- Product creation rollback test.
- Stock receiving rollback test.
- Concurrent inventory-update test.
- PostgreSQL restart and persistence verification.
- Complete live Module 1 and Module 2 PostgreSQL test run.

## Safety Statement

No migration safety, seed safety, transaction safety, rollback safety, concurrency safety, or persistence safety is claimed from this run. Those claims require a running PostgreSQL server and passing live PostgreSQL tests.

## Unresolved Risks

- The current Codex sandbox blocks PostgreSQL startup on macOS because `shmget` and `shm_open` are not permitted.
- Docker-based validation cannot run until Docker Desktop, OrbStack, Podman, Colima, or another container runtime is installed and available to the shell.
- A dedicated external development database can also work, but credentials must be provided through environment variables and must not point to production.

## Exact Next Step

Use one of the following outside the restricted sandbox:

1. Install/start Docker Desktop or OrbStack, then run the repo Docker Compose PostgreSQL service.
2. Install Postgres.app and start it through the macOS app.
3. Provide a dedicated non-production PostgreSQL connection string.

After PostgreSQL is available, run:

```bash
cd "/Users/bibekadhikari/Documents/GitHub/subhakamana store /production-readiness/module-01-database"

export DATABASE_URL="postgresql://subhakamana:change_me_local_only@127.0.0.1:5432/subhakamana_store_dev?schema=public"
export TEST_DATABASE_URL="postgresql://subhakamana:change_me_local_only@127.0.0.1:5432/subhakamana_store_test?schema=public"
export SEED_ADMIN_EMAIL="admin@subhakamanastore.local"
export SEED_ADMIN_PASSWORD="<temporary strong password>"

pnpm db:generate
DATABASE_URL="$DATABASE_URL" pnpm db:deploy
DATABASE_URL="$TEST_DATABASE_URL" pnpm db:deploy
DATABASE_URL="$DATABASE_URL" pnpm db:seed

cd "../module-02-api-foundation"
DATABASE_URL="$DATABASE_URL" SESSION_SECRET="<32+ character local secret>" pnpm start
TEST_DATABASE_URL="$TEST_DATABASE_URL" node --test test/postgres-integration.test.js
node --test test/*.test.js
```

## Conclusion

A PostgreSQL-capable validation environment could not be fully established inside the current sandbox, even though PostgreSQL 16.10 was successfully compiled from official source. The blocker is the environment-level restriction on PostgreSQL shared-memory system calls, not the project code.

The project is ready for the next live validation attempt as soon as a real non-production PostgreSQL runtime is available through Docker, Postgres.app, or a dedicated development database.
