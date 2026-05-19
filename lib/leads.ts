import type { Lead } from "@prisma/client";
import { z } from "zod";

import { prisma } from "@/lib/db";
import { isMailerConfigured, sendMail } from "@/lib/mailer";
import { SITE_URL } from "@/lib/constants";

const NON_EMPTY = z.string().trim().min(1);

/**
 * What the visitor said they need. Drives which conditional fields are
 * shown in the form and which routing bucket the lead lands in.
 */
export const INTENT_VALUES = [
  "comparing",
  "implementation",
  "support",
  "other",
] as const;
export type LeadIntent = (typeof INTENT_VALUES)[number];

export const INTENT_LABELS: Record<LeadIntent, string> = {
  comparing: "I'm comparing options",
  implementation: "I need setup or implementation help",
  support: "I need support with an existing setup",
  other: "Something else",
};

/**
 * Internal routing bucket derived from intent. Kept separate from intent
 * so we can tighten the mapping later without breaking what visitors saw.
 */
export const ROUTING_VALUES = [
  "referral_only",
  "service_only",
  "support",
  "triage",
] as const;
export type LeadRouting = (typeof ROUTING_VALUES)[number];

export function deriveRouting(intent: LeadIntent): LeadRouting {
  switch (intent) {
    case "comparing":
      return "referral_only";
    case "implementation":
      return "service_only";
    case "support":
      return "support";
    case "other":
      return "triage";
  }
}

export const LeadSchema = z.object({
  intent: z.enum(INTENT_VALUES).optional(),
  isUrgent: z.boolean().optional(),
  name: NON_EMPTY.max(200),
  email: z.string().trim().email().max(320),
  company: z.string().trim().max(200).optional().or(z.literal("").transform(() => undefined)),
  phone: z.string().trim().max(40).optional().or(z.literal("").transform(() => undefined)),
  industry: z.string().trim().max(80).optional().or(z.literal("").transform(() => undefined)),
  monthlyCallVolume: z
    .string()
    .trim()
    .max(40)
    .optional()
    .or(z.literal("").transform(() => undefined)),
  mainUseCase: z
    .string()
    .trim()
    .max(200)
    .optional()
    .or(z.literal("").transform(() => undefined)),
  currentPhoneSetup: z
    .string()
    .trim()
    .max(200)
    .optional()
    .or(z.literal("").transform(() => undefined)),
  mustHaveIntegrations: z
    .string()
    .trim()
    .max(400)
    .optional()
    .or(z.literal("").transform(() => undefined)),
  budgetRange: z
    .string()
    .trim()
    .max(80)
    .optional()
    .or(z.literal("").transform(() => undefined)),
  timeline: z
    .string()
    .trim()
    .max(80)
    .optional()
    .or(z.literal("").transform(() => undefined)),
  notes: z.string().trim().max(2000).optional().or(z.literal("").transform(() => undefined)),
});

export type LeadInput = z.infer<typeof LeadSchema>;

export const QuizSchema = LeadSchema.extend({
  recommendedVendors: z.array(z.string().min(1)).max(10).optional(),
});

export type QuizInput = z.infer<typeof QuizSchema>;

export type LeadSource = "contact" | "quiz" | "concierge";

type PersistLeadInput = LeadInput & {
  recommendedVendors?: string[];
};

export async function persistLead(input: PersistLeadInput, source: LeadSource) {
  const recommended = input.recommendedVendors?.length
    ? input.recommendedVendors.join(",")
    : null;
  const routing = input.intent ? deriveRouting(input.intent) : null;

  return prisma.lead.create({
    data: {
      source,
      intent: input.intent ?? null,
      routing,
      isUrgent: input.isUrgent ?? null,
      name: input.name,
      email: input.email,
      company: input.company ?? null,
      phone: input.phone ?? null,
      industry: input.industry ?? null,
      monthlyCallVolume: input.monthlyCallVolume ?? null,
      mainUseCase: input.mainUseCase ?? null,
      currentPhoneSetup: input.currentPhoneSetup ?? null,
      mustHaveIntegrations: input.mustHaveIntegrations ?? null,
      budgetRange: input.budgetRange ?? null,
      timeline: input.timeline ?? null,
      notes: input.notes ?? null,
      recommendedVendors: recommended,
    },
  });
}

/**
 * Sends an internal notification email for a new lead. Always logs; only
 * sends mail when the Microsoft Graph mailer is configured. Throws are
 * caught so a mail failure can never break the API response — the lead
 * is already persisted by the time this runs.
 */
export async function notifyLead(lead: Lead): Promise<void> {
  console.log(
    `[lead] new (${lead.source ?? "unknown"}) id=${lead.id} email=${lead.email} name="${lead.name}"` +
      (lead.recommendedVendors ? ` recommended=${lead.recommendedVendors}` : ""),
  );

  if (!isMailerConfigured()) return;

  try {
    const { subject, html, text } = renderLeadEmail(lead);
    await sendMail({ subject, html, text });
  } catch (err) {
    console.error("[lead] notify email failed:", err);
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderLeadEmail(lead: Lead) {
  const intentLabel = lead.intent && (INTENT_LABELS as Record<string, string>)[lead.intent];
  const headerLabel = intentLabel ?? (lead.source ?? "unknown");
  const urgentPrefix = lead.isUrgent ? "[URGENT] " : "";
  const routingTag = lead.routing ? ` [${lead.routing}]` : "";
  const subject = `${urgentPrefix}[CallTreo] ${headerLabel}${routingTag} — ${lead.name}`;

  const rows: Array<[string, string | null]> = [
    ["Intent", intentLabel ?? null],
    ["Routing", lead.routing],
    ["Urgent", lead.isUrgent ? "Yes" : null],
    ["Source channel", lead.source ?? null],
    ["Name", lead.name],
    ["Email", lead.email],
    ["Company", lead.company],
    ["Phone", lead.phone],
    ["Industry", lead.industry],
    ["Monthly call volume", lead.monthlyCallVolume],
    ["Main use case", lead.mainUseCase],
    ["Current phone setup", lead.currentPhoneSetup],
    ["Must-have integrations", lead.mustHaveIntegrations],
    ["Budget range", lead.budgetRange],
    ["Timeline", lead.timeline],
    ["Recommended vendors", lead.recommendedVendors],
    ["Notes", lead.notes],
  ];

  const rowsHtml = rows
    .filter(([, value]) => value && value.trim().length > 0)
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:8px 16px 8px 0;vertical-align:top;color:#5B6875;font-size:13px;text-transform:uppercase;letter-spacing:0.04em;font-weight:600;white-space:nowrap;">${escapeHtml(label)}</td>
        <td style="padding:8px 0;vertical-align:top;color:#1F2933;font-size:14px;line-height:1.5;">${escapeHtml(value as string).replace(/\n/g, "<br>")}</td>
      </tr>`,
    )
    .join("");

  const html = `<!doctype html>
<html><body style="margin:0;padding:24px;background:#F4F6F8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#1F2933;">
  <div style="max-width:640px;margin:0 auto;background:#FFFFFF;border:1px solid #D6DEE6;border-radius:12px;overflow:hidden;">
    <div style="padding:20px 24px;background:${lead.isUrgent ? "#A8590F" : "#2F4F70"};color:#F4F6F8;">
      <div style="font-size:12px;text-transform:uppercase;letter-spacing:0.18em;opacity:0.85;">CallTreo · ${lead.isUrgent ? "URGENT lead" : "New lead"}</div>
      <div style="margin-top:6px;font-size:20px;font-weight:700;">${escapeHtml(headerLabel)} · ${escapeHtml(lead.name)}</div>
    </div>
    <table style="width:100%;border-collapse:collapse;padding:24px;">
      ${rowsHtml}
    </table>
    <div style="padding:16px 24px;background:#ECEFF3;color:#5B6875;font-size:12px;line-height:1.6;">
      Lead ID: <code>${escapeHtml(lead.id)}</code> · captured ${escapeHtml(lead.createdAt.toISOString())}<br>
      Submitted via ${escapeHtml(SITE_URL)} · open Prisma Studio against the prod database to manage.
    </div>
  </div>
</body></html>`;

  const text = rows
    .filter(([, value]) => value && value.trim().length > 0)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  return { subject, html, text: `${headerLabel} — ${lead.name}\n\n${text}` };
}

/**
 * Naive quiz → vendor recommendation. Picks up to 3 published vendors,
 * preferring those whose verticals match the quiz industry, then ranked by
 * overall score. Pure function around a Prisma query so it can be unit-tested
 * by mocking the prisma client.
 */
export async function recommendVendorsForQuiz(input: {
  industry?: string;
  pricingMax?: number;
  limit?: number;
}): Promise<string[]> {
  const limit = input.limit ?? 3;
  const verticalMatch = input.industry
    ? { vendorVerticals: { some: { vertical: { slug: input.industry } } } }
    : {};

  const candidates = await prisma.vendor.findMany({
    where: {
      isPublished: true,
      ...verticalMatch,
      ...(input.pricingMax !== undefined
        ? { pricingFromUsd: { lte: input.pricingMax } }
        : {}),
    },
    orderBy: [{ overallScore: { sort: "desc", nulls: "last" } }, { name: "asc" }],
    take: limit,
    select: { slug: true },
  });

  if (candidates.length >= limit) return candidates.map((v) => v.slug);

  // Backfill from top published vendors if we don't have enough vertical matches.
  const haveSlugs = new Set(candidates.map((v) => v.slug));
  const backfill = await prisma.vendor.findMany({
    where: { isPublished: true, NOT: { slug: { in: [...haveSlugs] } } },
    orderBy: [{ overallScore: { sort: "desc", nulls: "last" } }, { name: "asc" }],
    take: limit - candidates.length,
    select: { slug: true },
  });

  return [...candidates.map((v) => v.slug), ...backfill.map((v) => v.slug)];
}
