/**
 * One-off: seed ONLY ComparisonPage rows (no vendor wipe).
 *
 * The main prisma/seed.ts wipes + re-creates vendors. That's destructive
 * on prod — would lose any updates made via Prisma Studio plus reset the
 * vendor.updatedAt timestamps that drive editorial "Updated" dates.
 *
 * This script imports just seedComparisons() which uses upsert semantics
 * and is safe to re-run.
 *
 * Run:
 *   pnpm tsx scripts/seed-comparisons-only.ts
 *
 * Loads DATABASE_URL from .env (or whichever env file you've set up).
 */

import { readFileSync, existsSync } from "node:fs";
import { PrismaClient } from "@prisma/client";

import { seedComparisons } from "../prisma/seed-comparisons";

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

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL not set in env or .env; aborting.");
  process.exit(1);
}

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding ComparisonPage rows…");
  await seedComparisons(prisma);

  const total = await prisma.comparisonPage.count({ where: { status: "PUBLISHED" } });
  console.log(`\nDone. Published comparison pages: ${total}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
