/**
 * Non-destructive: upsert additional vendors into the published directory.
 *
 * Adds 4 well-known AI receptionist / AI voice agent providers as anchor
 * entries so the directory has real names beyond the original 8. Coverage
 * is intentionally conservative: name, slug, website, pricing model, and
 * a category-positioning tagline only. All quantitative fields (scores,
 * boolean capabilities, HIPAA, pricing amounts) are left null — they get
 * filled in via Prisma Studio after a real research pass, and the UI
 * already renders nulls as "—" / "On request".
 *
 * Why not just put these in prisma/seed-vendors.json and run db seed?
 * - The main seed.ts wipes + re-creates everything. That's destructive on
 *   prod and would clobber any field a human editor has filled in.
 * - This script uses upsert(): adds if missing, leaves existing rows
 *   alone. Safe to re-run.
 *
 * Run against prod:
 *   DATABASE_URL=<neon-pooled> pnpm tsx scripts/seed-additional-vendors.ts
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

const ADDITIONAL_VENDORS = [
  {
    slug: "bland-ai",
    name: "Bland AI",
    websiteUrl: "https://www.bland.ai",
    tagline: "Programmable AI phone agent platform (developer-focused)",
    summary:
      "Developer-focused platform for building AI phone agents with per-minute pricing. Best fit for teams comfortable wiring their own integrations rather than buying a turnkey receptionist product.",
    bestFor:
      "Engineering-led teams that want fine-grained control over the call flow and don't need a hands-on setup partner.",
    editorVerdict:
      "Coverage in progress. Listed as an anchor entry — pricing and capability details should be verified against current product before relying on this row.",
    pricingModel: "PER_MINUTE" as const,
  },
  {
    slug: "synthflow",
    name: "Synthflow",
    websiteUrl: "https://synthflow.ai",
    tagline: "No-code AI voice agent builder for SMBs and agencies",
    summary:
      "Builder platform for assembling AI voice agents without code. Positioned at SMBs and agencies that want to ship an AI receptionist without engineering resources.",
    bestFor:
      "SMBs and agencies that want a packaged builder rather than a developer API.",
    editorVerdict:
      "Coverage in progress. Listed as an anchor entry — capabilities, pricing tiers, and integrations should be verified against the current product.",
    pricingModel: "SUBSCRIPTION" as const,
  },
  {
    slug: "vapi",
    name: "VAPI",
    websiteUrl: "https://vapi.ai",
    tagline: "Voice AI infrastructure for developers",
    summary:
      "Developer infrastructure for voice AI applications. Similar layer to other voice AI platforms — a building block, not a turnkey receptionist product.",
    bestFor:
      "Engineering teams building custom voice AI experiences, including bespoke receptionist flows.",
    editorVerdict:
      "Coverage in progress. Infrastructure-layer product — best to treat as a 'build vs buy' option alongside the turnkey receptionists in this directory.",
    pricingModel: "CUSTOM_QUOTE" as const,
  },
  {
    slug: "numa",
    name: "Numa",
    websiteUrl: "https://numa.com",
    tagline: "AI customer communications for service businesses",
    summary:
      "Started with auto dealerships and has expanded into broader service businesses. Combines voice and messaging workflows in a single product.",
    bestFor:
      "Multi-location service businesses (especially auto and franchise) that need both inbound voice and SMS in one tool.",
    editorVerdict:
      "Coverage in progress. Strongest fit historically for auto dealership networks; verify positioning against your specific vertical before shortlisting.",
    pricingModel: "CUSTOM_QUOTE" as const,
  },
] as const;

async function main() {
  const results: Array<{ slug: string; action: "created" | "updated" | "skipped"; reason?: string }> =
    [];

  for (const v of ADDITIONAL_VENDORS) {
    const existing = await prisma.vendor.findUnique({ where: { slug: v.slug } });
    if (existing) {
      // Don't clobber a human-curated row. Only fill in fields that are
      // null so re-runs are idempotent and additive, never destructive.
      const patch: Record<string, unknown> = {};
      if (!existing.name) patch.name = v.name;
      if (!existing.websiteUrl) patch.websiteUrl = v.websiteUrl;
      if (!existing.tagline) patch.tagline = v.tagline;
      if (!existing.summary) patch.summary = v.summary;
      if (!existing.bestFor) patch.bestFor = v.bestFor;
      if (!existing.editorVerdict) patch.editorVerdict = v.editorVerdict;
      if (!existing.pricingModel || existing.pricingModel === "UNKNOWN")
        patch.pricingModel = v.pricingModel;

      if (Object.keys(patch).length > 0) {
        await prisma.vendor.update({ where: { slug: v.slug }, data: patch });
        results.push({ slug: v.slug, action: "updated", reason: `filled ${Object.keys(patch).join(", ")}` });
      } else {
        results.push({ slug: v.slug, action: "skipped", reason: "row already has values" });
      }
    } else {
      await prisma.vendor.create({
        data: {
          slug: v.slug,
          name: v.name,
          websiteUrl: v.websiteUrl,
          tagline: v.tagline,
          summary: v.summary,
          bestFor: v.bestFor,
          editorVerdict: v.editorVerdict,
          pricingModel: v.pricingModel,
          isPublished: true,
        },
      });
      results.push({ slug: v.slug, action: "created" });
    }
  }

  for (const r of results) {
    console.log(`[${r.action}] ${r.slug}${r.reason ? ` (${r.reason})` : ""}`);
  }

  const published = await prisma.vendor.count({ where: { isPublished: true } });
  console.log(`\nPublished vendor count: ${published}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
