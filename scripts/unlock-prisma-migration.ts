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
 * Run: pnpm tsx scripts/unlock-prisma-migration.ts
 */

import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";

// Load .env (override:false) then force DATABASE_URL to point at the direct
// (non-pooled) Neon URL so we can see + terminate real backends.
config();
if (!process.env.DIRECT_URL) {
  console.error("DIRECT_URL not set; aborting.");
  process.exit(1);
}
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
    console.log("No advisory-lock rows found. Lock is already free — re-run the deploy.");
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
    console.log("Lock released. Re-run the deploy.");
  } else {
    console.log("Lock still held — Neon may have re-attached the backend; try restarting the compute via the Neon dashboard.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
