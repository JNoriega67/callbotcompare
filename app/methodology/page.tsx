import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { EditorialMeta } from "@/components/marketing/editorial-meta";
import { JsonLd } from "@/components/marketing/json-ld";
import { WEIGHTS } from "@/lib/scoring";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "How CallTreo scores AI receptionists — methodology",
  description:
    "The exact weighted rubric we use to score AI receptionist vendors: 9 dimensions, their weights, how we collect data, what we refuse to score on, and how often we update.",
  path: "/methodology",
});

export const dynamic = "force-dynamic";

/* ------------------------------------------------------------------ */
/* Rubric data — source of truth is lib/scoring.ts WEIGHTS            */
/* ------------------------------------------------------------------ */

const RUBRIC = [
  {
    key: "callHandling",
    label: "Call handling",
    weight: WEIGHTS.callHandling,
    body:
      "Conversation quality, routing reliability, edge-case handling. Does the AI gracefully handle off-script inputs, accents, and noisy lines? Does it sound natural or robotic? This is the largest single weight because it's the most common reason a deployment fails post-launch.",
  },
  {
    key: "integrations",
    label: "Integrations",
    weight: WEIGHTS.integrations,
    body:
      "Native CRM and calendar fit, API flexibility, webhook robustness. We weight native > webhook > Zapier > none. Specific integration depth gets evaluated on the relevant integration pages.",
  },
  {
    key: "automation",
    label: "Automation",
    weight: WEIGHTS.automation,
    body:
      "Booking, qualification, follow-up triggers. Can the AI close the loop without a human? We score actual workflow completion, not feature checkboxes.",
  },
  {
    key: "easeOfSetup",
    label: "Ease of setup",
    weight: WEIGHTS.easeOfSetup,
    body:
      "Time to launch, technical complexity, ongoing tuning effort. A vendor that takes 6 weeks to launch is scored lower than one that ships in 1 — even if the 6-week vendor is more flexible.",
  },
  {
    key: "pricingValue",
    label: "Pricing value",
    weight: WEIGHTS.pricingValue,
    body:
      "Not lowest price — best value for the segment. Predictable pricing scores higher than opaque pricing. Hidden setup fees and aggressive overage rates get penalized.",
  },
  {
    key: "verticalFit",
    label: "Vertical fit",
    weight: WEIGHTS.verticalFit,
    body:
      "Templates and signals for specific industries (legal, medical, home services). A vendor optimized for SaaS sales won't fit an HVAC dispatch use case; we score against the segment, not the vendor's marketing.",
  },
  {
    key: "handoff",
    label: "Human handoff",
    weight: WEIGHTS.handoff,
    body:
      "Quality of escalation: live transfer, callback workflow, urgent routing. Vendors that hand off cleanly to your team beat vendors that pretend AI can handle everything.",
  },
  {
    key: "reporting",
    label: "Reporting",
    weight: WEIGHTS.reporting,
    body:
      "Call summaries, transcripts, dashboards. Useful for both ops and rep coaching. Lower weight because it's table-stakes for most vendors at this point.",
  },
  {
    key: "support",
    label: "Support",
    weight: WEIGHTS.support,
    body:
      "Onboarding quality, response time, ongoing partnership. Important when something breaks; less differentiated than the rest of the rubric in steady-state.",
  },
] as const;

const WHAT_WE_REFUSE = [
  {
    title: "We don't score on logo prestige.",
    body:
      "A vendor's Series-C funding round doesn't make their AI better. We've kept under-the-radar vendors high in rankings when the product warrants it, and dropped well-funded names when it didn't.",
  },
  {
    title: "We don't fabricate what we can't verify.",
    body:
      "Pricing, HIPAA status, specific integration support — we render \"On request\" or \"—\" when we can't confirm something publicly. We'd rather show a gap than invent a fact.",
  },
  {
    title: "We don't let referral fees move ranks.",
    body:
      "Some vendors pay us a referral fee. None of them have moved a rank because of it. The rubric is the rubric. See our disclosure for full detail.",
  },
  {
    title: "We don't write sponsored reviews.",
    body:
      "No vendor pays for placement in editor verdicts or comparison pages. Pricing-page snapshots, integration pages, and vendor reviews are all editorially independent.",
  },
] as const;

const DATA_SOURCES = [
  {
    title: "Vendor websites + product docs",
    body:
      "Feature claims, integration lists, and posted pricing. Treated as marketing material — we verify when we can.",
  },
  {
    title: "Vendor demos + live tests",
    body:
      "Where possible, we sit through a real demo and test the integration the vendor's claiming. Live tests carry the most weight in our scoring.",
  },
  {
    title: "User reviews + community signal",
    body:
      "G2, Capterra, Reddit, industry-specific forums. Useful for spotting patterns; we don't take any single review as gospel.",
  },
  {
    title: "Hands-on integration evaluation",
    body:
      "For the integration pages (HubSpot, Salesforce, Calendly, etc.), we test the integration where we have access — and clearly flag where we're relying on the vendor's documentation.",
  },
] as const;

const UPDATE_POLICY = [
  {
    title: "Quarterly editor pass",
    body:
      "Every published vendor gets re-reviewed at least once per quarter — scores updated, new product changes incorporated, deprecated features dropped.",
  },
  {
    title: "Ad-hoc updates on major changes",
    body:
      "Vendor ships a major feature, pricing change, or new integration → we update sooner. Same goes for de-listing if a vendor folds or pivots away.",
  },
  {
    title: "Versioned rubric",
    body:
      "We've kept the 9-dimension weighting stable since launch. If we materially change the weights, we'll publish a versioned rubric note explaining why and how scores shift.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Page() {
  const totalWeight = RUBRIC.reduce((sum, r) => sum + r.weight, 0);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Home", href: "/" },
          { label: "Methodology", href: "/methodology" },
        ])}
      />

      {/* HERO */}
      <Section tone="paper" className="pt-10 pb-12 md:pt-14 md:pb-14">
        <Container className="space-y-6">
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/" },
              { label: "Methodology", href: "/methodology" },
            ]}
          />
          <div className="grid gap-10 md:grid-cols-[7fr_5fr] md:items-end md:gap-14">
            <div>
              <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
                Methodology · How we score
              </p>
              <h1 className="mt-3 font-heading text-[2.25rem] font-bold leading-[1.05] tracking-tight text-ink md:text-[3.5rem]">
                The scoring rubric,{" "}
                <span className="font-light text-ink/60">in full and in public.</span>
              </h1>
              <div className="mt-5">
                <EditorialMeta
                  updated="2026-05"
                  sourcingLabel="Disclosure"
                  sourcingHref="/disclosure"
                  reviewCadence="Rubric versioned + change-logged"
                />
              </div>
            </div>
            <div className="flex flex-col justify-end gap-5">
              <p className="text-base leading-relaxed text-ink-soft md:text-lg">
                Every vendor on CallTreo is scored against the same nine-dimension weighted rubric.
                This page documents exactly how that score is computed, what we refuse to score on,
                and how often we update. If you find a vendor we&apos;ve scored wrong — email
                hello@calltreo.com and we&apos;ll re-review.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/vendors"
                  className="inline-flex items-center gap-2 rounded-[var(--radius-button)] bg-signal px-5 py-3 font-heading text-[13px] font-semibold uppercase tracking-[0.08em] text-signal-ink transition-colors hover:bg-signal-hover"
                >
                  See the scored directory
                </Link>
                <Link
                  href="/disclosure"
                  className="inline-flex items-center gap-2 rounded-[var(--radius-button)] border border-ink/15 bg-surface px-5 py-3 font-heading text-[13px] font-semibold uppercase tracking-[0.08em] text-ink transition-colors hover:border-signal hover:text-signal"
                >
                  Editorial disclosure
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* RUBRIC TABLE */}
      <Section tone="deep" className="py-14 md:py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
              The rubric
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-[1.1] text-ink md:text-4xl">
              Nine dimensions. Total weight {totalWeight.toFixed(2)}.
            </h2>
            <p className="mt-4 text-ink-soft">
              Each dimension is scored 0–10 by an editor; the overall score is the weighted average.
              The weights below are what live in our scoring code today — not aspirational, not a
              future plan.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-[var(--radius-card)] border border-rule bg-surface shadow-[var(--shadow-card)]">
            <table className="w-full text-left text-sm">
              <thead className="bg-paper-deep">
                <tr className="border-b border-rule font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-ink">
                  <th className="px-5 py-4 w-[20%]">Dimension</th>
                  <th className="px-5 py-4 w-[8%] text-right">Weight</th>
                  <th className="px-5 py-4">What it means</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule">
                {RUBRIC.map((r) => (
                  <tr key={r.key} className="align-top">
                    <th className="px-5 py-5 text-left font-heading text-sm font-semibold text-ink">
                      {r.label}
                    </th>
                    <td className="px-5 py-5 text-right">
                      <span className="font-heading text-base font-bold tabular-nums text-signal">
                        {(r.weight * 100).toFixed(0)}%
                      </span>
                    </td>
                    <td className="px-5 py-5 text-ink-soft">{r.body}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-paper-deep">
                <tr className="border-t border-rule font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-ink">
                  <th className="px-5 py-3 text-left">Total</th>
                  <td className="px-5 py-3 text-right">
                    <span className="font-heading text-base font-bold tabular-nums text-ink">
                      {(totalWeight * 100).toFixed(0)}%
                    </span>
                  </td>
                  <td className="px-5 py-3 text-ink-soft">Maps to a 0–10 overall score.</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Container>
      </Section>

      {/* WHAT WE REFUSE */}
      <Section tone="tint" className="py-14 md:py-20">
        <Container className="grid gap-14 md:grid-cols-[5fr_7fr] md:gap-16">
          <div>
            <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
              What we refuse to do
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-[1.1] text-ink md:text-4xl">
              Honesty isn&apos;t a marketing claim. It&apos;s a list of things we won&apos;t do.
            </h2>
            <Link
              href="/disclosure"
              className="mt-5 inline-flex items-center gap-1 font-heading text-[12px] font-semibold uppercase tracking-[0.12em] text-ink underline-offset-4 hover:text-signal hover:underline"
            >
              Read the full editorial disclosure →
            </Link>
          </div>
          <ul className="space-y-6">
            {WHAT_WE_REFUSE.map((w) => (
              <li key={w.title} className="border-l-2 border-signal pl-5">
                <p className="font-heading text-base font-semibold text-ink">{w.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{w.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* DATA SOURCES */}
      <Section tone="deep" className="py-14 md:py-20">
        <Container className="grid gap-14 md:grid-cols-[5fr_7fr] md:gap-16">
          <div>
            <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
              How we gather data
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-[1.1] text-ink md:text-4xl">
              Four sources, weighted by reliability.
            </h2>
            <p className="mt-4 text-ink-soft">
              When sources conflict, hands-on testing beats reviews beats docs beats marketing.
              Anything we can&apos;t verify is rendered as a gap, not invented.
            </p>
          </div>
          <ul className="space-y-5">
            {DATA_SOURCES.map((s, i) => (
              <li
                key={s.title}
                className="rounded-[var(--radius-card)] border border-rule bg-surface p-5 shadow-[var(--shadow-card)] md:p-6"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-heading text-sm font-bold tabular-nums text-muted-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-ink">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.body}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* UPDATE POLICY */}
      <Section tone="paper" className="py-14 md:py-20">
        <Container className="grid gap-14 md:grid-cols-[5fr_7fr] md:gap-16">
          <div>
            <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
              How we update
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-[1.1] text-ink md:text-4xl">
              Scores aren&apos;t set and forgotten.
            </h2>
          </div>
          <ul className="space-y-6">
            {UPDATE_POLICY.map((u) => (
              <li key={u.title} className="border-l-2 border-signal pl-5">
                <p className="font-heading text-base font-semibold text-ink">{u.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{u.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* EDITORIAL CREDIBILITY */}
      <Section tone="deep" className="py-14 md:py-20">
        <Container>
          <div className="rounded-[var(--radius-card)] border border-rule bg-surface p-8 shadow-[var(--shadow-card)] md:p-10">
            <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
              Editorial
            </p>
            <h2 className="mt-3 font-heading text-2xl font-bold text-ink md:text-3xl">
              Maintained by the CallTreo editorial team.
            </h2>
            <p className="mt-4 max-w-3xl text-ink-soft">
              Scores and editor verdicts on this site are written by humans who&apos;ve been on the
              buying side of receptionist software. We push every page through a buyer-perspective
              read before publish — asking &quot;is this what we&apos;d want to know on the demo
              call?&quot; If a page fails that bar, it doesn&apos;t ship.
            </p>
            <p className="mt-4 max-w-3xl text-ink-soft">
              See something wrong? Email{" "}
              <a
                href="mailto:hello@calltreo.com"
                className="text-signal underline underline-offset-4 hover:text-signal-hover"
              >
                hello@calltreo.com
              </a>
              . Vendor corrections, factual disputes, or coverage requests are all welcome —
              we&apos;ll respond and update where the correction is valid.
            </p>
          </div>
        </Container>
      </Section>

      {/* MATCHED CTA */}
      <CtaBanner variant="matched" />
    </>
  );
}
