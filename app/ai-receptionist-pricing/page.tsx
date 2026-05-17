import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { JsonLd } from "@/components/marketing/json-ld";
import { prisma } from "@/lib/db";
import { formatPricing } from "@/lib/scoring";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "AI receptionist pricing — what you actually pay (2026)",
  description:
    "Honest, vendor-neutral guide to AI receptionist pricing. Real ranges by business size, what drives cost up, hidden line items to ask about, and how to compare per-minute vs flat monthly plans.",
  path: "/ai-receptionist-pricing",
});

export const dynamic = "force-dynamic";

/* ------------------------------------------------------------------ */
/* Content (editorial; not vendor-fed)                                 */
/* ------------------------------------------------------------------ */

const PRICING_MODELS = [
  {
    label: "Per-minute",
    rangeShort: "$0.30–$2.00/min",
    body:
      "You pay for the talk time. Cheap if your average call is short (booking, FAQ), expensive if calls drift long. Common with vendors building on top of voice infrastructure (Twilio, Vonage, Telnyx). Predictable when call volume is steady; unpredictable when it spikes.",
    bestFor: "Steady-volume businesses where avg call time is well-understood.",
  },
  {
    label: "Per-call",
    rangeShort: "$1–$8/call",
    body:
      "Flat fee per call regardless of length. Easier to budget than per-minute, harder to negotiate when calls run long. Common with virtual-receptionist providers adding AI as a hybrid layer.",
    bestFor: "Teams that prefer line-item predictability over absolute cheapest cost.",
  },
  {
    label: "Flat monthly",
    rangeShort: "$50–$500/mo",
    body:
      "Bucket of minutes or calls per month, plus overage. The cleanest plan to budget for. Watch the overage rate — that's where the real cost lives if you exceed your bucket.",
    bestFor: "Most SMBs with predictable call volume; easiest to forecast.",
  },
  {
    label: "Custom quote",
    rangeShort: "Variable",
    body:
      "Vendor wants to scope you. Common with enterprise-leaning vendors (Smith.ai, Dialpad). Often includes hybrid AI + human, custom integrations, or volume discounts. Don't assume custom = expensive; sometimes it's the only way to get the right setup.",
    bestFor: "Teams with non-standard requirements: high volume, complex routing, hybrid AI+human.",
  },
] as const;

const SIZE_RANGES = [
  {
    size: "Solo / micro (under 50 calls/mo)",
    monthly: "$0–$150/mo",
    body:
      "Cheapest tier on most platforms. Often the AI alone — no human backup. Per-call or low-bucket flat-monthly plans dominate. Best for testing whether the workflow makes sense before committing.",
    pitfall: "Some vendors don't sell at this tier; their minimum is $250+/mo.",
  },
  {
    size: "Small business (50–300 calls/mo)",
    monthly: "$100–$500/mo",
    body:
      "The sweet spot for most flat-monthly plans. Usually includes a real integration (CRM, calendar), some script customization, and email/chat support.",
    pitfall: "Overage rates kick in here — read them before signing.",
  },
  {
    size: "Mid-market (300–1500 calls/mo)",
    monthly: "$500–$2,000/mo",
    body:
      "Hybrid AI + human options become viable. Native CRM integrations, custom workflows, dedicated success contact. Some vendors offer volume discounts; some quietly don't.",
    pitfall: "Beware per-seat pricing creeping in alongside per-call.",
  },
  {
    size: "High volume / multi-location (1500+ calls/mo)",
    monthly: "$1,500–$10,000+/mo",
    body:
      "Custom quote territory. Pricing becomes about contract length, integration scope, and SLA. Negotiation matters more than the rate card.",
    pitfall: "Annual contracts with auto-renewal. Negotiate the exit terms upfront.",
  },
] as const;

const COST_DRIVERS_UP = [
  {
    title: "After-hours / 24/7 coverage",
    body: "Pure AI 24/7 is usually included. Hybrid (AI + live human escalation) at night adds 20–50% to the bill.",
  },
  {
    title: "Live human escalations",
    body: "Per-escalation fees ($2–$15 each) on top of AI base pricing. Adds up fast if your script over-escalates.",
  },
  {
    title: "Native CRM / calendar integrations",
    body: "Some vendors charge a setup fee ($300–$2,000) for the integration; others build it into the monthly. Both are normal — confirm which.",
  },
  {
    title: "Custom voice / brand training",
    body: "Branded voice or custom voice clone: usually $500–$5,000 one-time, sometimes plus a monthly. Almost always optional.",
  },
  {
    title: "Multi-location / multi-line setup",
    body: "Per-location or per-line add-ons. Common in service businesses with multiple shops or franchises.",
  },
  {
    title: "Custom call flow / professional services",
    body: "Vendor's own implementation team. $1,000–$10,000 for nontrivial flows. Often skippable if you have someone in-house — or you can use our setup services for a flat fee.",
  },
] as const;

const HIDDEN_LINE_ITEMS = [
  {
    title: "Setup / onboarding fee",
    body: "Sometimes one-time ($300–$3,000), sometimes hidden. Always ask: 'Is there any cost beyond the monthly plan?'",
  },
  {
    title: "Overage rate (per minute / per call)",
    body: "Bucket plans always have one. The rate matters more than the bucket size if you're growing.",
  },
  {
    title: "Number porting / phone number costs",
    body: "Most vendors include a phone number; porting your existing number can be $10–$50 one-time plus monthly fees.",
  },
  {
    title: "Recording storage / transcript retention",
    body: "Long-tail retention sometimes incurs storage fees. Most plans include 30–90 days; longer can cost extra.",
  },
  {
    title: "Annual vs monthly billing",
    body: "Annual commitments often discount 10–20%. Some plans only quote the annualized rate, hiding the monthly markup.",
  },
] as const;

const FAQS = [
  {
    question: "What does an AI receptionist actually cost for a small business?",
    answer:
      "Most SMBs (50–300 monthly calls) land between $100 and $500/month on a flat-monthly plan, with a one-time setup fee of $0–$1,500. Per-minute pricing can be cheaper if calls are short and steady; flat-monthly is easier to forecast.",
  },
  {
    question: "Is per-minute or flat-monthly cheaper?",
    answer:
      "Depends on your average call length. Per-minute wins if your calls are short (booking, FAQ) and volume is steady. Flat-monthly wins if calls can run long (qualification, intake) or if volume is unpredictable. Run the math on your last 90 days of call data before committing.",
  },
  {
    question: "Are there hidden costs?",
    answer:
      "Common ones: setup/onboarding fees, per-escalation fees if a human takes over, integration setup costs, and overage rates above your bucket. Ask the vendor for a 'total all-in cost' quote for your expected volume — and get it in writing.",
  },
  {
    question: "Do AI receptionists save money vs hiring a receptionist?",
    answer:
      "Almost always, yes — a full-time receptionist at $40k–$60k/year is dramatically more than even premium AI plans. The honest comparison isn't 'AI vs human,' it's 'AI vs the voicemail you're currently letting calls fall into.' For most SMBs, the savings come from captured calls that would otherwise be lost.",
  },
  {
    question: "Should I negotiate?",
    answer:
      "Yes, especially at mid-market and above. Vendors quoting custom rates have margin to give. Levers: annual contract (10–20% off), volume commitments, dropping nice-to-have features, paying upfront. Don't negotiate on the SLA or the integrations you actually need.",
  },
  {
    question: "What about free trials?",
    answer:
      "Common, usually 7–14 days. Long enough to test the call flow, not long enough to validate ROI on a live customer book. Use the trial to test 5–10 specific scenarios you care about; don't redirect all your calls to it until you're confident.",
  },
] as const;

const FAQ_JSON_LD = faqJsonLd(FAQS.map((f) => ({ question: f.question, answer: f.answer })));
const BREADCRUMB_JSON_LD = breadcrumbJsonLd([
  { label: "Home", href: "/" },
  { label: "AI receptionist pricing", href: "/ai-receptionist-pricing" },
]);

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default async function Page() {
  // Live pricing snapshot pulled from the vendor pool so the page stays
  // honest as we add vendors. Renders gracefully if pricing is "research
  // needed" (null).
  const vendors = await prisma.vendor.findMany({
    where: { isPublished: true },
    orderBy: [{ overallScore: { sort: "desc", nulls: "last" } }, { name: "asc" }],
    select: {
      slug: true,
      name: true,
      pricingModel: true,
      pricingFromUsd: true,
      pricingNotes: true,
    },
  });

  return (
    <>
      <JsonLd data={[BREADCRUMB_JSON_LD, FAQ_JSON_LD]} />

      {/* HERO */}
      <Section tone="paper" className="pt-10 pb-10 md:pt-14 md:pb-12">
        <Container className="space-y-6">
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/" },
              { label: "Pricing", href: "/ai-receptionist-pricing" },
            ]}
          />
          <div className="grid gap-10 md:grid-cols-[7fr_5fr] md:items-end md:gap-14">
            <div>
              <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
                Pricing · Buyer&apos;s Guide
              </p>
              <h1 className="mt-3 font-heading text-[2.25rem] font-bold leading-[1.05] tracking-tight text-ink md:text-[3.5rem]">
                AI receptionist pricing,{" "}
                <span className="font-light text-ink/60">explained without the spin.</span>
              </h1>
            </div>
            <div className="flex flex-col justify-end gap-5">
              <p className="text-base leading-relaxed text-ink-soft md:text-lg">
                Most pricing pages exist to push you toward a quote. This one exists to make sure
                you can negotiate intelligently when you ask for one. Real ranges, what drives cost,
                what to watch for in the contract — no vendor preferred.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/quiz"
                  className="inline-flex items-center gap-2 rounded-[var(--radius-button)] bg-signal px-5 py-3 font-heading text-[13px] font-semibold uppercase tracking-[0.08em] text-signal-ink transition-colors hover:bg-signal-hover"
                >
                  Get a price-fitted shortlist
                </Link>
                <Link
                  href="/vendors"
                  className="inline-flex items-center gap-2 rounded-[var(--radius-button)] border border-ink/15 bg-surface px-5 py-3 font-heading text-[13px] font-semibold uppercase tracking-[0.08em] text-ink transition-colors hover:border-signal hover:text-signal"
                >
                  See vendor pricing
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* PRICING MODELS */}
      <Section tone="deep" className="py-14 md:py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
              Pricing models
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-[1.1] text-ink md:text-4xl">
              Four models. Each makes a different bet.
            </h2>
            <p className="mt-4 text-ink-soft">
              Vendors don&apos;t pick a model randomly — it usually reflects what their underlying cost
              structure looks like. Knowing the model tells you what they care about and where the
              friction will be.
            </p>
          </div>
          <ol className="mt-10 grid gap-4 md:grid-cols-2">
            {PRICING_MODELS.map((m) => (
              <li
                key={m.label}
                className="rounded-[var(--radius-card)] border border-rule bg-surface p-6 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)]"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-heading text-xl font-bold text-ink">{m.label}</h3>
                  <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-signal">
                    {m.rangeShort}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{m.body}</p>
                <p className="mt-4 border-t border-rule pt-3 text-sm text-ink-soft">
                  <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-ink">
                    Best for ·{" "}
                  </span>
                  {m.bestFor}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* SIZE RANGES */}
      <Section tone="paper" className="py-14 md:py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
              Real ranges by business size
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-[1.1] text-ink md:text-4xl">
              What you&apos;ll actually pay at your scale.
            </h2>
          </div>
          <ul className="mt-10 divide-y divide-rule border-y border-rule">
            {SIZE_RANGES.map((r) => (
              <li key={r.size} className="grid gap-4 py-6 md:grid-cols-[5fr_3fr_4fr] md:gap-10">
                <div>
                  <h3 className="font-heading text-lg font-semibold text-ink">{r.size}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{r.body}</p>
                </div>
                <div>
                  <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-ink">
                    Typical range
                  </p>
                  <p className="mt-1 font-heading text-xl font-bold text-ink">{r.monthly}</p>
                </div>
                <div>
                  <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-ink">
                    Watch for
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{r.pitfall}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* GET MATCHED CTA */}
      <CtaBanner variant="matched" />

      {/* COST DRIVERS UP + HIDDEN LINE ITEMS */}
      <Section tone="paper" className="pt-14 pb-14 md:pt-16 md:pb-20">
        <Container className="grid gap-14 md:grid-cols-2 md:gap-16">
          <div>
            <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
              What drives cost up
            </p>
            <h2 className="mt-3 font-heading text-2xl font-bold text-ink md:text-3xl">
              Six things that move the bill.
            </h2>
            <ul className="mt-6 space-y-5">
              {COST_DRIVERS_UP.map((d) => (
                <li key={d.title} className="border-l-2 border-signal pl-5">
                  <p className="font-heading text-base font-semibold text-ink">{d.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{d.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
              Line items that sneak in
            </p>
            <h2 className="mt-3 font-heading text-2xl font-bold text-ink md:text-3xl">
              Always ask about these.
            </h2>
            <ul className="mt-6 space-y-5">
              {HIDDEN_LINE_ITEMS.map((d) => (
                <li key={d.title} className="border-l-2 border-rule pl-5">
                  <p className="font-heading text-base font-semibold text-ink">{d.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{d.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* LIVE VENDOR PRICING SNAPSHOT */}
      <Section tone="deep" className="py-14 md:py-20">
        <Container>
          <div className="grid gap-3 md:grid-cols-[5fr_7fr] md:items-end md:gap-12">
            <div>
              <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
                Vendor pricing snapshot
              </p>
              <h2 className="mt-3 font-heading text-2xl font-bold text-ink md:text-3xl">
                What the directory says, today.
              </h2>
            </div>
            <p className="text-sm text-ink-soft">
              Live from the vendor pool. &quot;On request&quot; means the vendor publishes no public
              rate card — those need a discovery call. Pricing changes; we update with each editor
              pass.
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-[var(--radius-card)] border border-rule bg-surface shadow-[var(--shadow-card)]">
            <table className="w-full text-left text-sm">
              <thead className="bg-paper-deep">
                <tr className="border-b border-rule font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-ink">
                  <th className="px-5 py-4 w-[28%]">Vendor</th>
                  <th className="px-5 py-4">Model</th>
                  <th className="px-5 py-4">From</th>
                  <th className="px-5 py-4">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule">
                {vendors.map((v) => (
                  <tr key={v.slug} className="align-top">
                    <th className="px-5 py-4 text-left font-heading text-sm font-semibold text-ink">
                      <Link
                        href={`/vendors/${v.slug}`}
                        className="hover:text-signal hover:underline"
                      >
                        {v.name}
                      </Link>
                    </th>
                    <td className="px-5 py-4 text-ink-soft">
                      {v.pricingModel ? v.pricingModel.replace(/_/g, " ").toLowerCase() : "—"}
                    </td>
                    <td className="px-5 py-4 font-heading text-sm font-semibold text-ink">
                      {formatPricing(v.pricingFromUsd, v.pricingModel)}
                    </td>
                    <td className="px-5 py-4 text-ink-soft">
                      {v.pricingNotes ?? <span className="text-muted-ink">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* ROI FRAMING */}
      <Section tone="paper" className="py-14 md:py-20">
        <Container>
          <div className="grid gap-10 md:grid-cols-[5fr_7fr] md:gap-16">
            <div>
              <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
                ROI framework
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold leading-[1.1] text-ink md:text-4xl">
                The honest math.
              </h2>
              <p className="mt-4 text-ink-soft">
                The wrong question is &quot;Is AI cheaper than a human receptionist.&quot; The right
                question is &quot;How many calls am I losing to voicemail right now, and what is one
                of those calls worth?&quot;
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] border border-rule bg-surface p-6 shadow-[var(--shadow-card)] md:p-8">
              <ol className="space-y-5">
                <li>
                  <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-signal">
                    Step 1 · Your missed-call rate
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    Pull your last 30 days of inbound calls. Count how many went to voicemail or
                    rang out. Typical SMB miss rate is 15–35%.
                  </p>
                </li>
                <li>
                  <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-signal">
                    Step 2 · Average value of one captured call
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    For most service businesses: (close rate) × (average job size). E.g., 25% close
                    × $400 avg job = $100 per call. Be honest; tire-kickers don&apos;t count.
                  </p>
                </li>
                <li>
                  <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-signal">
                    Step 3 · Break-even
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    Recovered calls × value-per-call must exceed monthly AI cost + your time.
                    Example: 8 recovered calls/month × $100 = $800. AI cost $250/mo → 3x ROI.
                  </p>
                </li>
                <li>
                  <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-signal">
                    Step 4 · Quality gate
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    If close rate on AI-captured leads is materially lower than on live calls,
                    discount accordingly. Use the trial to measure this.
                  </p>
                </li>
              </ol>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="paper" className="pb-16 md:pb-20">
        <Container>
          <div className="grid gap-10 md:grid-cols-[5fr_7fr] md:gap-16">
            <div>
              <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
                FAQ
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold text-ink md:text-4xl">
                Pricing questions buyers actually ask.
              </h2>
            </div>
            <div className="border-t border-rule">
              <FaqAccordion items={[...FAQS]} />
            </div>
          </div>
        </Container>
      </Section>

      {/* SETUP CTA */}
      <CtaBanner variant="setup" />
    </>
  );
}
