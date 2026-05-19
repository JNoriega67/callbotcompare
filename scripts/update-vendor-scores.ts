/**
 * Repeatable score-update workflow. Reads SCORE_UPDATES, applies any
 * provided sub-scores to the matching vendor row, and recomputes
 * overallScore via the published rubric weights from lib/scoring so
 * the visible score moves stay consistent with what's displayed in
 * the scorecard breakdown.
 *
 * Run against prod (idempotent, only touches sub-score columns):
 *   DATABASE_URL=<neon-pooled> pnpm tsx scripts/update-vendor-scores.ts
 *
 * After running, also re-seed seed-vendors.json so a future fresh
 * seed matches the live data (the JSON edits are committed alongside
 * this script).
 */

import { readFileSync, existsSync } from "node:fs";
import { PrismaClient } from "@prisma/client";

import { WEIGHTS } from "../lib/scoring";

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

/**
 * Each entry carries the new sub-score(s) plus a 1-line evidence note
 * so a future researcher can audit why a value moved.
 *
 * Sources for this pass (May 2026):
 *  - smith-ai      → smith.ai/features (online dashboard, daily summaries,
 *                    searchable transcripts, AI-tagged calls in CRM)
 *  - synthflow     → docs.synthflow.ai (analytics dashboard for call
 *                    volume + outcomes, recurring call-data exports,
 *                    post-call webhooks)
 *  - bland-ai      → bland.ai (Discord + daily office hours for support)
 *  - vapi          → docs.vapi.ai (Boards custom dashboards, call analysis,
 *                    server-event webhooks, evals/simulations/scorecards)
 *  - voiceflow     → docs.voiceflow.com (analytics on response time, token
 *                    usage, routing, conversation volume; transcripts;
 *                    custom evaluations with CSAT/deflection)
 *  - abby-connect  → abby.com (AI-generated sentiment scores, comprehensive
 *                    portal dashboard, recordings + transcripts + summaries,
 *                    Client Success Team + Solutions Engineer)
 */
const SCORE_UPDATES: Array<{
  slug: string;
  scoreReporting?: number;
  scoreSupport?: number;
  evidence: string;
}> = [
  {
    slug: "smith-ai",
    scoreReporting: 8.5,
    evidence: "Online dashboard + real-time call data + searchable transcripts + CRM-tagged call data documented on smith.ai/features.",
  },
  {
    slug: "synthflow",
    scoreReporting: 7.5,
    evidence: "Analytics dashboard, recurring call-data exports, and post-call webhooks documented in docs.synthflow.ai.",
  },
  {
    slug: "bland-ai",
    scoreSupport: 7.5,
    evidence: "Discord with live support and daily office hours documented on bland.ai.",
  },
  {
    slug: "vapi",
    scoreReporting: 8.0,
    evidence: "Custom Boards dashboards, call analysis, server-event webhooks, and evals/simulations/scorecards documented in docs.vapi.ai.",
  },
  {
    slug: "voiceflow-agency-builders",
    scoreReporting: 8.5,
    evidence: "Agent analytics (response time, token usage, routing, conversation volume) + custom evaluations with CSAT/deflection in docs.voiceflow.com.",
  },
  {
    slug: "abby-connect",
    scoreReporting: 8.0,
    evidence: "AI-generated sentiment scores + comprehensive portal dashboard + recordings/transcripts/summaries documented on abby.com.",
  },
];

type SubScores = {
  callHandling: number | null;
  integrations: number | null;
  automation: number | null;
  easeOfSetup: number | null;
  pricingValue: number | null;
  verticalFit: number | null;
  handoff: number | null;
  reporting: number | null;
  support: number | null;
};

function recomputeOverall(sub: SubScores): number | null {
  // Only recompute if every sub-score is set. Otherwise we'd silently
  // demote a vendor to a fractional overall driven by partial data.
  for (const v of Object.values(sub)) if (v == null) return null;
  const overall =
    sub.callHandling! * WEIGHTS.callHandling +
    sub.integrations! * WEIGHTS.integrations +
    sub.automation! * WEIGHTS.automation +
    sub.easeOfSetup! * WEIGHTS.easeOfSetup +
    sub.pricingValue! * WEIGHTS.pricingValue +
    sub.verticalFit! * WEIGHTS.verticalFit +
    sub.handoff! * WEIGHTS.handoff +
    sub.reporting! * WEIGHTS.reporting +
    sub.support! * WEIGHTS.support;
  return Math.round(overall * 10) / 10;
}

async function main() {
  const updateMap = new Map(SCORE_UPDATES.map((u) => [u.slug, u]));
  // Process every published vendor — we always recompute overallScore
  // from sub-scores so the rubric formula is the single source of
  // truth. Several legacy rows had hand-authored overalls that drifted
  // from a clean weighted sum by 0.10-0.20; this pass normalizes them.
  const vendors = await prisma.vendor.findMany({ where: { isPublished: true } });

  for (const existing of vendors) {
    const update = updateMap.get(existing.slug);
    const nextReporting = update?.scoreReporting ?? existing.scoreReporting;
    const nextSupport = update?.scoreSupport ?? existing.scoreSupport;

    const sub: SubScores = {
      callHandling: existing.scoreCallHandling,
      integrations: existing.scoreIntegrations,
      automation: existing.scoreAutomation,
      easeOfSetup: existing.scoreEaseOfSetup,
      pricingValue: existing.scorePricingValue,
      verticalFit: existing.scoreVerticalFit,
      handoff: existing.scoreHandoff,
      reporting: nextReporting,
      support: nextSupport,
    };
    const overall = recomputeOverall(sub);

    const data: Record<string, number | null> = {};
    if (update?.scoreReporting != null) data.scoreReporting = update.scoreReporting;
    if (update?.scoreSupport != null) data.scoreSupport = update.scoreSupport;
    if (overall != null && existing.overallScore !== overall) {
      data.overallScore = overall;
    }

    if (Object.keys(data).length === 0) {
      console.log(`[unchanged] ${existing.slug}`);
      continue;
    }

    await prisma.vendor.update({ where: { slug: existing.slug }, data });
    const deltas = [
      update?.scoreReporting != null
        ? `reporting ${existing.scoreReporting ?? "?"} -> ${update.scoreReporting}`
        : null,
      update?.scoreSupport != null
        ? `support ${existing.scoreSupport ?? "?"} -> ${update.scoreSupport}`
        : null,
      data.overallScore != null
        ? `overall ${existing.overallScore ?? "?"} -> ${data.overallScore}`
        : null,
    ]
      .filter(Boolean)
      .join(", ");
    console.log(`[updated] ${existing.slug.padEnd(28)} ${deltas}`);
    if (update) console.log(`           evidence: ${update.evidence}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
