import { z } from "zod";

import { prisma } from "@/lib/db";

const NON_EMPTY = z.string().trim().min(1);

export const LeadSchema = z.object({
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

  return prisma.lead.create({
    data: {
      source,
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

export function notifyLead(lead: {
  id: string;
  source: string | null;
  email: string;
  name: string;
  recommendedVendors: string | null;
}) {
  // TODO(resend): swap for transactional email via Resend.
  console.log(
    `[lead] new (${lead.source ?? "unknown"}) id=${lead.id} email=${lead.email} name="${lead.name}"` +
      (lead.recommendedVendors ? ` recommended=${lead.recommendedVendors}` : ""),
  );
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
