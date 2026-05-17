import { NextResponse } from "next/server";

import {
  notifyLead,
  persistLead,
  recommendVendorsForQuiz,
  QuizSchema,
} from "@/lib/leads";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
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
