import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { EditorialMeta } from "@/components/marketing/editorial-meta";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { JsonLd } from "@/components/marketing/json-ld";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const PATH = "/ai-receptionist-vs-virtual-receptionist";

export const metadata: Metadata = buildMetadata({
  title: "AI receptionist vs virtual receptionist — honest comparison (2026)",
  description:
    "AI receptionists and human virtual receptionists solve overlapping problems differently. We compare them head-to-head on cost, hours, complex-call handling, integrations, and customer perception — without pretending either side is obviously better.",
  path: PATH,
});

export const dynamic = "force-dynamic";

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

type Row = {
  dimension: string;
  ai: string;
  virtual: string;
  /** Which side this dimension typically favors. */
  edge: "ai" | "virtual" | "tie";
};

const ROWS: ReadonlyArray<Row> = [
  {
    dimension: "Cost per month",
    ai: "$50–$500/mo, or $0.30–$2.00 per minute",
    virtual: "$150–$1,500/mo, typically per-minute or per-call",
    edge: "ai",
  },
  {
    dimension: "Hours covered",
    ai: "24/7 on day one, no upcharge",
    virtual: "Usually business hours, 24/7 is a paid add-on",
    edge: "ai",
  },
  {
    dimension: "Time to launch",
    ai: "1–4 weeks (script, integration, testing)",
    virtual: "1–3 days (signup, brief, account live)",
    edge: "virtual",
  },
  {
    dimension: "Handles complex / emotional calls",
    ai: "Struggles. Best vendors hand off, average vendors stall",
    virtual: "Clear win. Humans read nuance and reset emotional calls",
    edge: "virtual",
  },
  {
    dimension: "Handles call volume spikes",
    ai: "Scales instantly. 100 simultaneous calls = no problem",
    virtual: "Caps at the staffed seat count; spikes go to voicemail",
    edge: "ai",
  },
  {
    dimension: "Appointment booking into a calendar",
    ai: "Strong. Real-time, bi-directional sync where the integration exists",
    virtual: "Workable but human-mediated; some lag, occasional re-keying",
    edge: "ai",
  },
  {
    dimension: "Pushes structured data into a CRM",
    ai: "Strong. Native integrations or webhooks land qualified fields",
    virtual: "Inconsistent. Often email summaries the team re-keys",
    edge: "ai",
  },
  {
    dimension: "Customer perception",
    ai: "Mixed. ~30% notice and prefer human; quality gap is shrinking fast",
    virtual: "Generally warmer for first impressions and trust-heavy verticals",
    edge: "virtual",
  },
  {
    dimension: "Handles ambiguous requests outside the script",
    ai: "Limited. 'Off-script' calls expose the seams",
    virtual: "Clear win. Humans improvise; AI follows the script you wrote",
    edge: "virtual",
  },
  {
    dimension: "Multilingual support",
    ai: "Strong. Most vendors ship 3–10 languages out of the box",
    virtual: "Depends on staffing; Spanish common, others rare",
    edge: "ai",
  },
];

const AI_WINS = [
  {
    title: "High volume, repetitive intake",
    body:
      "Salons, dental offices, home-services dispatchers, large medical practices — anywhere most calls are 'I want to book / reschedule / cancel'. AI handles 70–90% of these without a human. The math is brutal in AI's favor at scale.",
  },
  {
    title: "After-hours and weekend coverage",
    body:
      "If you're losing 5–15 calls a week to voicemail after-hours, AI is the cheapest fix. A virtual receptionist's 24/7 add-on usually costs more than the entire AI stack.",
  },
  {
    title: "Tight CRM / calendar integration is the goal",
    body:
      "If you need every call to land in HubSpot, Salesforce, or your FSM tool with structured fields — AI does this natively. Virtual receptionists usually summarize-then-email, which still needs a human to re-key.",
  },
];

const VIRTUAL_WINS = [
  {
    title: "Low volume, high-trust calls",
    body:
      "Boutique law firms, estate planners, therapy practices, premium consultants — the first call is often a trust-building conversation, not a transaction. A trained human still wins these hands-down.",
  },
  {
    title: "Emotionally complex inbound calls",
    body:
      "Medical bad news, billing complaints, frustrated customers, legal intake for sensitive cases. AI either over-scripts or stalls. A virtual receptionist resets the call and de-escalates.",
  },
  {
    title: "You can't invest the setup time",
    body:
      "AI receptionists need a real script, a few rounds of tuning, and a CRM integration. If you need coverage by next week and can't run the project, a virtual receptionist gets you live in days.",
  },
];

const HYBRID_NOTES = [
  {
    title: "AI takes the routine 70–80%",
    body:
      "Bookings, reschedules, FAQs, qualification, after-hours intake. The AI handles the bulk of volume with consistent quality at low cost.",
  },
  {
    title: "Humans take the complex 20–30%",
    body:
      "Anything off-script, emotional, high-dollar, or VIP. The AI's escalation rules route these to a virtual receptionist team, not a voicemail box.",
  },
  {
    title: "One source of truth",
    body:
      "Both sides log into the same CRM, so the customer record is consistent regardless of who answered. Most failures of hybrid setups come from skipping this — don't.",
  },
];

const FAQS = [
  {
    question: "Will customers notice they're talking to AI?",
    answer:
      "Best vendors are close to indistinguishable for the first 30–60 seconds, especially on transactional calls. Customers notice on calls that go off-script or get emotional — the AI's 'I can help you with…' loop gives it away. Quality is closing fast; this answer probably gets weaker every six months.",
  },
  {
    question: "What's actually cheaper: AI or virtual?",
    answer:
      "At >40 calls/month, AI is usually cheaper — sometimes 5–10x cheaper. Under 20 calls/month, virtual can win on total cost because there's a setup fixed-cost for AI that you have to amortize. Crossover varies by vendor.",
  },
  {
    question: "Can a virtual receptionist do what AI can't (yet)?",
    answer:
      "Yes — read tone, improvise off-script, handle a billing complaint without making it worse, recognize a VIP customer by voice. None of these are AI strengths in 2026. AI is closing the gap; it has not closed it.",
  },
  {
    question: "Is a hybrid setup actually realistic for a small business?",
    answer:
      "If your monthly call volume is under ~75, probably not — the overhead of running two systems eats the savings. Above ~150 calls/month, hybrid is usually the right answer: AI for the routine 70-80%, a virtual receptionist team for escalations.",
  },
  {
    question: "What about call quality — is AI 'good enough' yet?",
    answer:
      "For routine inbound (booking, FAQs, qualification), yes — most top vendors are good enough that customers complete the call without complaint. For high-empathy or off-script calls, no — AI still stumbles, and a human still wins. This is the honest split as of mid-2026.",
  },
  {
    question: "If I pick AI, do I lose the option of going back to virtual?",
    answer:
      "Not really. Phone numbers are portable. Most virtual receptionist services onboard a new account in days. The bigger switching cost is the CRM integration you'd build for AI — you'd lose that work if you went back to a human-only model.",
  },
];

const FAQ_JSON_LD = faqJsonLd(FAQS.map((f) => ({ question: f.question, answer: f.answer })));

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default async function Page() {
  return (
    <>
      <JsonLd data={FAQ_JSON_LD} />

      {/* Hero */}
      <Section tone="paper">
        <Container className="grid gap-10 md:grid-cols-[7fr_5fr] md:items-end md:gap-16">
          <div>
            <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
              AI vs Virtual · Buyer Decision
            </p>
            <h1 className="mt-3 font-heading text-[2.25rem] font-bold leading-[1.05] tracking-tight text-ink md:text-[3.5rem]">
              AI receptionist vs virtual receptionist —{" "}
              <span className="font-light text-ink/60">
                neither one wins every call.
              </span>
            </h1>
            <div className="mt-5">
              <EditorialMeta updated="2026-05" />
            </div>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl">
              Both solve the &quot;a real person needs to answer the phone&quot;
              problem in overlapping but different ways. This is an honest
              head-to-head — where AI is the better buy, where a human virtual
              receptionist still wins, and when a hybrid is the right answer.
            </p>
          </div>
          <aside className="rounded-[var(--radius-card)] border border-rule bg-surface p-6 shadow-[var(--shadow-card)]">
            <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.18em] text-signal">
              Quick verdict
            </p>
            <p className="mt-3 text-base leading-relaxed text-ink-soft">
              If most of your calls are <span className="font-semibold text-ink">booking, FAQs, or routine intake</span>{" "}
              — go AI. If most of your calls are{" "}
              <span className="font-semibold text-ink">emotional, off-script, or trust-building</span>{" "}
              — stay with a virtual receptionist. Above ~150 calls/month, a
              hybrid almost always beats either alone.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 rounded-[var(--radius-button)] bg-signal px-4 py-2 font-heading text-[12px] font-semibold uppercase tracking-[0.1em] text-signal-ink transition-colors hover:bg-signal-hover"
              >
                Take the 5-question quiz
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-[var(--radius-button)] border border-ink/15 px-4 py-2 font-heading text-[12px] font-semibold uppercase tracking-[0.1em] text-ink transition-colors hover:border-signal hover:text-signal"
              >
                Get a personal recommendation
              </Link>
            </div>
          </aside>
        </Container>
      </Section>

      {/* Comparison table */}
      <Section tone="deep">
        <Container>
          <div className="max-w-3xl">
            <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
              Head to head
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-[1.1] text-ink md:text-4xl">
              The dimensions that actually decide it.
            </h2>
            <p className="mt-4 text-ink-soft">
              We&apos;ve skipped the marketing-page comparisons (&quot;both
              answer phones&quot;) in favor of the 10 things that change which
              one is the right buy for you.
            </p>
          </div>

          {/* Desktop table */}
          <div className="mt-10 hidden overflow-hidden rounded-[var(--radius-card)] border border-rule bg-surface shadow-[var(--shadow-card)] md:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-paper-deep">
                <tr className="border-b border-rule font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-ink">
                  <th className="px-5 py-4 w-[28%]">Dimension</th>
                  <th className="px-5 py-4">AI receptionist</th>
                  <th className="px-5 py-4">Virtual receptionist</th>
                  <th className="px-5 py-4 w-[10%] text-center">Edge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule">
                {ROWS.map((row) => (
                  <tr key={row.dimension} className="align-top">
                    <th className="px-5 py-4 text-left font-heading text-sm font-semibold text-ink">
                      {row.dimension}
                    </th>
                    <td className="px-5 py-4 text-ink-soft">{row.ai}</td>
                    <td className="px-5 py-4 text-ink-soft">{row.virtual}</td>
                    <td className="px-5 py-4 text-center">
                      <EdgePill edge={row.edge} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile stacked cards */}
          <div className="mt-8 grid gap-3 md:hidden">
            {ROWS.map((row) => (
              <div
                key={row.dimension}
                className="rounded-[var(--radius-card)] border border-rule bg-surface p-5 shadow-[var(--shadow-card)]"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-heading text-base font-semibold text-ink">
                    {row.dimension}
                  </h3>
                  <EdgePill edge={row.edge} />
                </div>
                <dl className="mt-3 space-y-2 text-sm text-ink-soft">
                  <div>
                    <dt className="font-heading text-[10px] font-semibold uppercase tracking-[0.14em] text-signal">
                      AI
                    </dt>
                    <dd>{row.ai}</dd>
                  </div>
                  <div>
                    <dt className="font-heading text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-ink">
                      Virtual
                    </dt>
                    <dd>{row.virtual}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* When AI wins */}
      <Section tone="paper">
        <Container>
          <div className="grid gap-10 md:grid-cols-2 md:gap-12">
            <div>
              <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
                When AI wins
              </p>
              <h2 className="mt-3 font-heading text-2xl font-bold leading-[1.1] text-ink md:text-3xl">
                AI is the right buy when volume, speed, and integration matter.
              </h2>
              <ul className="mt-6 space-y-5">
                {AI_WINS.map((w) => (
                  <li key={w.title}>
                    <h3 className="font-heading text-base font-semibold text-ink">
                      {w.title}
                    </h3>
                    <p className="mt-1 text-ink-soft">{w.body}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <Link
                  href="/best-ai-receptionist-software"
                  className="inline-flex items-center gap-2 font-heading text-[12px] font-semibold uppercase tracking-[0.12em] text-signal hover:text-signal-hover"
                >
                  See the top AI receptionists →
                </Link>
              </div>
            </div>
            <div>
              <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-ink">
                When virtual still wins
              </p>
              <h2 className="mt-3 font-heading text-2xl font-bold leading-[1.1] text-ink md:text-3xl">
                A human still wins when the call needs judgment, not a script.
              </h2>
              <ul className="mt-6 space-y-5">
                {VIRTUAL_WINS.map((w) => (
                  <li key={w.title}>
                    <h3 className="font-heading text-base font-semibold text-ink">
                      {w.title}
                    </h3>
                    <p className="mt-1 text-ink-soft">{w.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Hybrid */}
      <Section tone="deep">
        <Container>
          <div className="max-w-3xl">
            <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
              The third option
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-[1.1] text-ink md:text-4xl">
              Most growing businesses end up hybrid.
            </h2>
            <p className="mt-4 text-ink-soft">
              The framing isn&apos;t &quot;AI vs human&quot; — it&apos;s &quot;what
              should AI handle and what should escalate to a human.&quot; Over ~150
              calls/month, hybrid usually beats either pure model on both cost and
              quality.
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {HYBRID_NOTES.map((n) => (
              <article
                key={n.title}
                className="rounded-[var(--radius-card)] border border-rule bg-surface p-6 shadow-[var(--shadow-card)]"
              >
                <h3 className="font-heading text-lg font-semibold text-ink">
                  {n.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {n.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* Matched CTA */}
      <CtaBanner variant="matched" />

      {/* FAQ */}
      <Section tone="paper">
        <Container>
          <div className="grid gap-10 md:grid-cols-[4fr_6fr] md:gap-16">
            <div>
              <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
                Questions buyers actually ask
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold leading-[1.1] text-ink md:text-4xl">
                Honest answers, no upsell.
              </h2>
              <p className="mt-4 text-ink-soft">
                These are the questions we hear most from teams making this
                exact call. Where the honest answer is &quot;it depends,&quot;
                we say so.
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] border border-rule bg-surface px-5 shadow-[var(--shadow-card)]">
              <FaqAccordion items={FAQS} />
            </div>
          </div>
        </Container>
      </Section>

      {/* Setup CTA */}
      <CtaBanner variant="setup" />
    </>
  );
}

function EdgePill({ edge }: { edge: Row["edge"] }) {
  if (edge === "tie") {
    return (
      <span className="inline-flex items-center rounded-full bg-paper-deep px-2.5 py-0.5 font-heading text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-ink">
        Tie
      </span>
    );
  }
  if (edge === "ai") {
    return (
      <span className="inline-flex items-center rounded-full bg-signal-soft px-2.5 py-0.5 font-heading text-[10px] font-semibold uppercase tracking-[0.12em] text-signal-deep">
        AI
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full border border-ink/15 bg-paper px-2.5 py-0.5 font-heading text-[10px] font-semibold uppercase tracking-[0.12em] text-ink">
      Virtual
    </span>
  );
}
