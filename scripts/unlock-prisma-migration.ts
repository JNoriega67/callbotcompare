/**
 * One-off: clear stuck Prisma migration advisory lock (id 72707369) in Neon.
 *
 * Symptom: `prisma migrate deploy` fails with P1002 "Timed out trying to
 * acquire a postgres advisory lock (SELECT pg_advisory_lock(72707369))"
 * because a previous migration crashed mid-flight holding the lock.
 *
 * Fix: connect via DIRECT_URL (bypassing the Neon pooler so we see real
 * pg_locks / pg_stat_activity rows), find every backend holding the lock,
 * terminate them, and verify the lock is free.
 *
 * Run:
 *   - Locally: pnpm tsx scripts/unlock-prisma-migration.ts
 *     (reads DIRECT_URL from .env if not already set in process.env)
 *   - CI: set DIRECT_URL in the step's env block; .env is not required.
 *
 * Zero external runtime deps beyond @prisma/client — we read .env manually
 * because dotenv isn't a declared project dep.
 */

import { readFileSync, existsSync } from "node:fs";
import { PrismaClient } from "@prisma/client";

/**
 * Minimal .env loader: only sets keys that aren't already in process.env,
 * matching the standard `override:false` semantics. Handles `KEY=value`
 * and `KEY="value with spaces"` lines; ignores comments and blanks.
 */
function loadDotenv(path: string) {
  if (!existsSync(path)) return;
  const raw = readFileSync(path, "utf8");
  for (const rawLine of raw.split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

loadDotenv(".env");

if (!process.env.DIRECT_URL) {
  console.error("DIRECT_URL not set in env or .env; aborting.");
  process.exit(1);
}

// Prisma reads DATABASE_URL for the datasource; force it to the direct
// (non-pooled) URL so pg_locks / pg_stat_activity show real backends.
process.env.DATABASE_URL = process.env.DIRECT_URL;

const prisma = new PrismaClient();

type LockRow = { pid: number; granted: boolean };
type ActivityRow = {
  pid: number;
  state: string | null;
  application_name: string | null;
  query_start: Date | null;
  state_change: Date | null;
  query: string | null;
};

async function main() {
  const LOCK_ID = 72707369;

  console.log(`Looking for holders of advisory lock objid=${LOCK_ID}…`);
  const locks = await prisma.$queryRawUnsafe<LockRow[]>(
    `SELECT pid, granted FROM pg_locks WHERE locktype='advisory' AND objid=${LOCK_ID}`,
  );
  console.log("pg_locks rows:", locks);

  if (locks.length === 0) {
    console.log("No advisory-lock rows found. Lock is already free — proceed with migration.");
    return;
  }

  const pids = locks.map((l) => l.pid);
  const activity = await prisma.$queryRawUnsafe<ActivityRow[]>(
    `SELECT pid, state, application_name, query_start, state_change, query
       FROM pg_stat_activity
      WHERE pid IN (${pids.join(",")})`,
  );
  console.log("Backends:", activity);

  for (const pid of pids) {
    const result = await prisma.$queryRawUnsafe<{ pg_terminate_backend: boolean }[]>(
      `SELECT pg_terminate_backend(${pid})`,
    );
    console.log(`Terminated pid ${pid}:`, result);
  }

  const afterLocks = await prisma.$queryRawUnsafe<LockRow[]>(
    `SELECT pid, granted FROM pg_locks WHERE locktype='advisory' AND objid=${LOCK_ID}`,
  );
  console.log("pg_locks after termination:", afterLocks);

  if (afterLocks.length === 0) {
    console.log("Lock released. Proceed with migration.");
  } else {
    console.log("Lock still held — Neon may have re-attached the backend; try restarting the compute via the Neon dashboard.");
    process.exit(1);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
