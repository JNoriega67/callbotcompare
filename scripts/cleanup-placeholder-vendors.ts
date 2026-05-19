/**
 * One-off: delete the two unpublished category-placeholder vendor rows
 * that were seeded early on as stand-ins for not-yet-researched vertical
 * buckets. Both have `isPublished: false` so they don't appear in the
 * directory, but they:
 *   - inflate the total vendor row count in admin/Studio views
 *   - hold orphan join-table rows against verticals/features
 *   - read as dead weight in the schema
 *
 * Vendor relations are FK'd with onDelete: Cascade (VendorVertical,
 * VendorFeature, ComparisonVendor), so a single vendor.delete cleans
 * everything up. Idempotent — re-running after they're gone is a no-op.
 *
 * Run:
 *   DATABASE_URL=<neon-pooled> pnpm tsx scripts/cleanup-placeholder-vendors.ts
 */

import { readFileSync, existsSync } from "node:fs";
import { PrismaClient } from "@prisma/client";

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
loadDotenv(".env.local");

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL not set; aborting.");
  process.exit(1);
}

const prisma = new PrismaClient();

const PLACEHOLDER_SLUGS = [
  "legal-ai-answering-vendors",
  "medical-ai-answering-vendors",
] as const;

async function main() {
  for (const slug of PLACEHOLDER_SLUGS) {
    const existing = await prisma.vendor.findUnique({ where: { slug } });
    if (!existing) {
      console.log(`[skipped] ${slug} (already absent)`);
      continue;
    }
    if (existing.isPublished) {
      // Safety net: never delete a published vendor row even if it has
      // a placeholder-looking slug. A human would have intentionally
      // promoted it.
      console.warn(`[refused] ${slug} is published — refusing to delete`);
      continue;
    }
    await prisma.vendor.delete({ where: { slug } });
    console.log(`[deleted] ${slug}`);
  }

  const total = await prisma.vendor.count();
  const published = await prisma.vendor.count({ where: { isPublished: true } });
  console.log(`\nTotal vendor rows: ${total} (${published} published)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
