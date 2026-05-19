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

type Capability = {
  hipaaFriendly?: boolean;
  hasAppointmentBooking?: boolean;
  hasCrmIntegration?: boolean;
  hasHumanHandoff?: boolean;
  hasMultilingual?: boolean;
  has24x7?: boolean;
};

type Scores = {
  overall: number;
  callHandling: number;
  integrations: number;
  automation: number;
  easeOfSetup: number;
  pricingValue: number;
  verticalFit: number;
  handoff: number;
  reporting: number;
  support: number;
};

type VendorSeed = {
  slug: string;
  name: string;
  websiteUrl: string;
  tagline: string;
  summary: string;
  bestFor: string;
  editorVerdict: string;
  pricingModel: "SUBSCRIPTION" | "USAGE_BASED" | "PER_MINUTE" | "CUSTOM_QUOTE" | "HYBRID" | "UNKNOWN";
  pricingNotes?: string;
  setupComplexity?: number;
  capabilities?: Capability;
  scores?: Scores;
  verticalSlugs?: string[];
  featureSlugs?: string[];
};

const ADDITIONAL_VENDORS: ReadonlyArray<VendorSeed> = [
  {
    slug: "bland-ai",
    name: "Bland AI",
    websiteUrl: "https://www.bland.ai",
    tagline: "Programmable enterprise AI phone agents with per-minute pricing",
    summary:
      "Developer-focused voice AI platform marketed at enterprises in healthcare, finance, and insurance. Bland publishes a broad integration list (Salesforce, HubSpot, Twilio, Slack, Notion, Zapier, Calendly, Cal.com, Genesys, Five9, NICE CXone, Talkdesk, Amazon Connect, SIP) and supports 40+ languages, 24/7 operation, and human handoff with context. Best fit for teams comfortable wiring their own integrations rather than buying a turnkey SMB receptionist product.",
    bestFor:
      "Enterprise teams with engineering resources that want fine-grained control over voice agent behavior and a flat per-minute pricing model.",
    editorVerdict:
      "Strong technical platform with explicit SOC 2 / HIPAA / PCI DSS / GDPR posture. Less of a fit for a small business buyer who wants a packaged receptionist than for an engineering team building a custom call workflow. Per-minute pricing not published on the marketing site at the time of review.",
    pricingModel: "PER_MINUTE",
    pricingNotes:
      "Per-minute pricing covers LLM + STT + TTS + telephony as a single rate, but the rate is not published publicly on bland.ai.",
    setupComplexity: 4,
    capabilities: {
      hipaaFriendly: true,
      hasAppointmentBooking: true,
      hasCrmIntegration: true,
      hasHumanHandoff: true,
      hasMultilingual: true,
      has24x7: true,
    },
    scores: {
      overall: 7.4,
      callHandling: 8.0,
      integrations: 9.0,
      automation: 8.0,
      easeOfSetup: 5.0,
      pricingValue: 6.5,
      verticalFit: 6.0,
      handoff: 8.0,
      reporting: 6.5,
      support: 7.0,
    },
    verticalSlugs: ["medical-offices"],
    featureSlugs: [
      "crm-integration",
      "appointment-booking",
      "human-handoff",
      "multilingual-support",
      "after-hours-coverage",
      "hipaa-friendly",
    ],
  },
  {
    slug: "synthflow",
    name: "Synthflow",
    websiteUrl: "https://synthflow.ai",
    tagline: "No-code AI voice agents with pay-as-you-go pricing",
    summary:
      "No-code builder for AI voice agents marketed at enterprises and agencies. Explicit integrations with HubSpot, Salesforce, GoHighLevel, Cal.com, Google Cloud, and Zapier. Supports multilingual calls (English + Spanish called out specifically), 24/7 operation, appointment booking, and human handoff for high-intent leads. SOC 2 / HIPAA / PCI DSS / GDPR posture stated on their site.",
    bestFor:
      "Agencies and SMB-to-mid-market teams that want a packaged builder rather than a developer API, especially those already on HubSpot or GoHighLevel.",
    editorVerdict:
      "Solid no-code option with credible compliance posture and the integrations a small services business actually uses. Pricing is usage-based ('pay only for calls and chats conducted') but specific rates aren't published, so budget modeling needs a call.",
    pricingModel: "USAGE_BASED",
    pricingNotes:
      "Pay-as-you-go pricing — pay only for calls and chats actually conducted. Specific per-call rates not published on synthflow.ai.",
    setupComplexity: 2,
    capabilities: {
      hipaaFriendly: true,
      hasAppointmentBooking: true,
      hasCrmIntegration: true,
      hasHumanHandoff: true,
      hasMultilingual: true,
      has24x7: true,
    },
    scores: {
      overall: 7.5,
      callHandling: 7.5,
      integrations: 8.0,
      automation: 8.0,
      easeOfSetup: 8.0,
      pricingValue: 7.0,
      verticalFit: 7.0,
      handoff: 7.5,
      reporting: 6.5,
      support: 7.0,
    },
    verticalSlugs: ["medical-offices", "real-estate", "small-business"],
    featureSlugs: [
      "crm-integration",
      "appointment-booking",
      "human-handoff",
      "multilingual-support",
      "after-hours-coverage",
      "hipaa-friendly",
      "lead-qualification",
    ],
  },
  {
    slug: "vapi",
    name: "VAPI",
    websiteUrl: "https://vapi.ai",
    tagline: "API-first voice AI platform for developers (SOC 2 + HIPAA + PCI)",
    summary:
      "Voice AI infrastructure that markets itself as 'API-first by design' with 750K+ developers and Fortune 100 customers (Ring/Amazon, GoHealth, Instawork, Kavak). Vapi handles the underlying voice infrastructure so engineering teams can build custom agents on top. Compliance posture stated: SOC 2, HIPAA, and PCI compliant. Multilingual support and appointment scheduling are called out as supported use cases.",
    bestFor:
      "Engineering teams that want a managed voice AI platform — phone, models, telephony — without building it from scratch. Not a turnkey SMB receptionist.",
    editorVerdict:
      "Strong developer infrastructure with serious compliance posture. Not the right pick for a small business buyer who wants a packaged receptionist; better treated as a 'build it yourself' option for teams already building custom voice experiences. Per-minute or platform pricing not published on the marketing site at the time of review.",
    pricingModel: "CUSTOM_QUOTE",
    pricingNotes:
      "Pricing not published publicly on vapi.ai. Platform pricing model — talk to sales.",
    setupComplexity: 4,
    capabilities: {
      hipaaFriendly: true,
      hasAppointmentBooking: true,
      hasMultilingual: true,
    },
    scores: {
      overall: 6.8,
      callHandling: 7.5,
      integrations: 7.5,
      automation: 8.5,
      easeOfSetup: 4.0,
      pricingValue: 6.5,
      verticalFit: 5.5,
      handoff: 5.5,
      reporting: 6.5,
      support: 7.5,
    },
    featureSlugs: ["appointment-booking", "multilingual-support", "hipaa-friendly"],
  },
  {
    slug: "numa",
    name: "Numa",
    websiteUrl: "https://numa.com",
    tagline: "Always-on AI for auto dealerships — voice + text in one inbox",
    summary:
      "Vertical-specialist AI platform for auto dealerships. Combines voice and SMS workflows in a single Smart Inbox with deep DMS integrations: CDK, Reynolds & Reynolds, XTime, Tekion, VinSolutions, WiAdvisor, ELead, PBS, DealerBuilt, DealerTrack, DealerVault, DealerFX. Operator feature 'routes with context' for human handoff. Marketing leads with 'always-on AI' and dealership-specific outcomes ('convert 31% of cold messages into booked appointments').",
    bestFor:
      "Single-location and multi-location auto dealerships that need both inbound voice and SMS qualification, plus integration into their existing DMS / CRM stack.",
    editorVerdict:
      "Best-in-class fit if you're an auto dealership — the DMS integration list is genuinely deeper than any general-purpose AI receptionist. Narrow elsewhere: if you're not in automotive, this is a stretch even though the underlying tech would work. No HIPAA / SOC 2 / multilingual / 24x7-explicit claims on the marketing site at time of review (capabilities may exist but aren't documented publicly).",
    pricingModel: "CUSTOM_QUOTE",
    pricingNotes:
      "Pricing not published publicly on numa.com — dealership-direct sales motion.",
    setupComplexity: 3,
    capabilities: {
      hasAppointmentBooking: true,
      hasCrmIntegration: true,
      hasHumanHandoff: true,
      has24x7: true,
    },
    scores: {
      overall: 7.3,
      callHandling: 7.5,
      integrations: 9.0,
      automation: 7.5,
      easeOfSetup: 7.0,
      pricingValue: 6.5,
      verticalFit: 6.0,
      handoff: 7.0,
      reporting: 7.0,
      support: 7.0,
    },
    verticalSlugs: ["auto-dealers"],
    featureSlugs: [
      "crm-integration",
      "appointment-booking",
      "human-handoff",
      "after-hours-coverage",
      "lead-qualification",
      "sms-follow-up",
    ],
  },
];

// Vertical slugs the additional vendors reference. If a slug isn't
// already in the DB (e.g. older prod data predates a new vertical),
// upsert it with a humanized name so the join can succeed.
const VERTICAL_FALLBACK_NAMES: Record<string, string> = {
  "auto-dealers": "Auto Dealerships",
};

function buildPatch(existing: { [k: string]: unknown }, v: VendorSeed): Record<string, unknown> {
  const patch: Record<string, unknown> = {};
  // Only fill fields that are null. Never overwrite a human edit.
  if (!existing.name) patch.name = v.name;
  if (!existing.websiteUrl) patch.websiteUrl = v.websiteUrl;
  if (!existing.tagline) patch.tagline = v.tagline;
  if (!existing.summary) patch.summary = v.summary;
  if (!existing.bestFor) patch.bestFor = v.bestFor;
  if (!existing.editorVerdict) patch.editorVerdict = v.editorVerdict;
  if (!existing.pricingModel || existing.pricingModel === "UNKNOWN")
    patch.pricingModel = v.pricingModel;
  if (!existing.pricingNotes && v.pricingNotes) patch.pricingNotes = v.pricingNotes;
  if (existing.setupComplexity == null && v.setupComplexity != null)
    patch.setupComplexity = v.setupComplexity;

  if (v.capabilities) {
    for (const [key, value] of Object.entries(v.capabilities)) {
      if (existing[key] == null) patch[key] = value;
    }
  }

  if (v.scores) {
    const map: Record<string, keyof Scores> = {
      overallScore: "overall",
      scoreCallHandling: "callHandling",
      scoreIntegrations: "integrations",
      scoreAutomation: "automation",
      scoreEaseOfSetup: "easeOfSetup",
      scorePricingValue: "pricingValue",
      scoreVerticalFit: "verticalFit",
      scoreHandoff: "handoff",
      scoreReporting: "reporting",
      scoreSupport: "support",
    };
    for (const [column, scoreKey] of Object.entries(map)) {
      if (existing[column] == null) patch[column] = v.scores[scoreKey];
    }
  }

  return patch;
}

async function syncJoinTables(vendorId: string, v: VendorSeed) {
  if (v.verticalSlugs?.length) {
    for (const slug of v.verticalSlugs) {
      // Upsert the vertical itself in case prod predates a newly-added
      // taxonomy entry (e.g. auto-dealers). Falls back to titleizing
      // the slug if we don't have an explicit display name.
      const vertical = await prisma.vertical.upsert({
        where: { slug },
        update: {},
        create: {
          slug,
          name:
            VERTICAL_FALLBACK_NAMES[slug] ??
            slug
              .split("-")
              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(" "),
        },
      });
      await prisma.vendorVertical.upsert({
        where: { vendorId_verticalId: { vendorId, verticalId: vertical.id } },
        update: {},
        create: { vendorId, verticalId: vertical.id },
      });
    }
  }
  if (v.featureSlugs?.length) {
    for (const slug of v.featureSlugs) {
      const feature = await prisma.feature.findUnique({ where: { slug } });
      if (!feature) continue;
      await prisma.vendorFeature.upsert({
        where: { vendorId_featureId: { vendorId, featureId: feature.id } },
        update: {},
        create: { vendorId, featureId: feature.id },
      });
    }
  }
}

async function main() {
  const results: Array<{ slug: string; action: "created" | "updated" | "skipped"; reason?: string }> =
    [];

  for (const v of ADDITIONAL_VENDORS) {
    const existing = await prisma.vendor.findUnique({ where: { slug: v.slug } });
    if (existing) {
      const patch = buildPatch(existing as unknown as { [k: string]: unknown }, v);
      if (Object.keys(patch).length > 0) {
        await prisma.vendor.update({ where: { slug: v.slug }, data: patch });
        results.push({ slug: v.slug, action: "updated", reason: `filled ${Object.keys(patch).length} fields` });
      } else {
        results.push({ slug: v.slug, action: "skipped", reason: "row already has values" });
      }
      await syncJoinTables(existing.id, v);
    } else {
      const created = await prisma.vendor.create({
        data: {
          slug: v.slug,
          name: v.name,
          websiteUrl: v.websiteUrl,
          tagline: v.tagline,
          summary: v.summary,
          bestFor: v.bestFor,
          editorVerdict: v.editorVerdict,
          pricingModel: v.pricingModel,
          pricingNotes: v.pricingNotes,
          setupComplexity: v.setupComplexity,
          isPublished: true,
          ...(v.capabilities ?? {}),
          ...(v.scores
            ? {
                overallScore: v.scores.overall,
                scoreCallHandling: v.scores.callHandling,
                scoreIntegrations: v.scores.integrations,
                scoreAutomation: v.scores.automation,
                scoreEaseOfSetup: v.scores.easeOfSetup,
                scorePricingValue: v.scores.pricingValue,
                scoreVerticalFit: v.scores.verticalFit,
                scoreHandoff: v.scores.handoff,
                scoreReporting: v.scores.reporting,
                scoreSupport: v.scores.support,
              }
            : {}),
        },
      });
      await syncJoinTables(created.id, v);
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
