import { NextResponse } from "next/server";

import { LeadSchema, notifyLead, persistLead, type LeadSource } from "@/lib/leads";
import { clientIp, take } from "@/lib/rate-limit";

const VALID_SOURCES: ReadonlyArray<LeadSource> = ["contact", "quiz", "concierge"];

function pickSource(value: string | null): LeadSource {
  if (value && (VALID_SOURCES as readonly string[]).includes(value)) {
    return value as LeadSource;
  }
  return "contact";
}

export async function POST(request: Request) {
  // 5 submissions per IP per 10 minutes. Slows scripted abuse without
  // blocking a human who re-submits after a real error.
  if (!take({ key: `leads:${clientIp(request)}`, max: 5, windowMs: 10 * 60_000 })) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Server-side honeypot: if any non-empty `website` field comes through,
  // pretend success but drop the request. The form intentionally never
  // sends this field; only bots would.
  if (
    typeof payload === "object" &&
    payload !== null &&
    typeof (payload as { website?: unknown }).website === "string" &&
    ((payload as { website: string }).website).trim().length > 0
  ) {
    return NextResponse.json({ ok: true }, { status: 200 });
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
  await notifyLead(lead);

  return NextResponse.json({ id: lead.id }, { status: 200 });
}
