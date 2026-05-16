import { NextResponse } from "next/server";

import { LeadSchema, notifyLead, persistLead, type LeadSource } from "@/lib/leads";

const VALID_SOURCES: ReadonlyArray<LeadSource> = ["contact", "quiz", "concierge"];

function pickSource(value: string | null): LeadSource {
  if (value && (VALID_SOURCES as readonly string[]).includes(value)) {
    return value as LeadSource;
  }
  return "contact";
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = LeadSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const url = new URL(request.url);
  const source = pickSource(url.searchParams.get("source"));

  // Allow caller to pass recommendedVendors through (e.g. quiz form).
  const recommendedVendors = Array.isArray((payload as { recommendedVendors?: unknown }).recommendedVendors)
    ? ((payload as { recommendedVendors: unknown[] }).recommendedVendors.filter(
        (s): s is string => typeof s === "string",
      ) as string[])
    : undefined;

  const lead = await persistLead({ ...parsed.data, recommendedVendors }, source);
  notifyLead({
    id: lead.id,
    source: lead.source,
    email: lead.email,
    name: lead.name,
    recommendedVendors: lead.recommendedVendors,
  });

  return NextResponse.json({ id: lead.id }, { status: 200 });
}
