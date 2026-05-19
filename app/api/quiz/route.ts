import { NextResponse } from "next/server";

import {
  notifyLead,
  persistLead,
  recommendVendorsForQuiz,
  QuizSchema,
} from "@/lib/leads";
import { clientIp, take } from "@/lib/rate-limit";

export async function POST(request: Request) {
  if (!take({ key: `quiz:${clientIp(request)}`, max: 5, windowMs: 10 * 60_000 })) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (
    typeof payload === "object" &&
    payload !== null &&
    typeof (payload as { website?: unknown }).website === "string" &&
    ((payload as { website: string }).website).trim().length > 0
  ) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const parsed = QuizSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const recommendedVendors = await recommendVendorsForQuiz({
    industry: parsed.data.industry,
    pricingMax: undefined,
    limit: 3,
  });

  const lead = await persistLead({ ...parsed.data, recommendedVendors }, "quiz");
  await notifyLead(lead);

  return NextResponse.json({ id: lead.id, recommendedVendors }, { status: 200 });
}
