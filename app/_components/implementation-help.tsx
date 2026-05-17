import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

const DELIVERABLES = [
  {
    title: "Vendor selection",
    body: "We score your shortlist against your call flow, integrations stack, and the way your team actually answers the phone today.",
  },
  {
    title: "Call flow design",
    body: "Greeting, qualification, routing, escalation. We write the prompts and the fallback paths so the AI sounds like your business — not a chatbot.",
  },
  {
    title: "Integration + launch",
    body: "CRM, calendar, helpdesk, SMS follow-up. We wire it up, test on a real number, and stay on after launch until call quality is steady.",
  },
] as const;

/**
 * Paid implementation/setup help. Editorial framing — read as "we
 * also do this for teams that need a hand," not as a sales pitch.
 * Lives between HowWeEvaluate and FAQ in the page flow.
 */
export function ImplementationHelp() {
  return (
    <Section tone="deep">
      <Container>
        <div className="grid gap-12 md:grid-cols-[5fr_7fr] md:gap-16">
          <div>
            <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
              Implementation
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-[1.1] text-ink md:text-4xl">
              Need more than a recommendation?
            </h2>
            <p className="mt-4 text-ink-soft">
              Some teams want a tool. Other teams want a tool plus the call flow, the CRM hookup,
              and someone who has done this before. If you&apos;re the second kind, we run
              fixed-scope setup engagements for small and mid-sized service businesses.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-[var(--radius-button)] bg-ink px-5 py-3 font-heading text-[13px] font-semibold uppercase tracking-[0.08em] text-paper transition-colors hover:bg-signal"
              >
                Talk to us about setup
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/best-ai-receptionist-software"
                className="inline-flex items-center font-heading text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-ink underline-offset-4 hover:text-ink hover:underline"
              >
                or read our methodology
              </Link>
            </div>
          </div>
          <ol className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-4">
            {DELIVERABLES.map((d, i) => (
              <li
                key={d.title}
                className="rounded-[var(--radius-card)] border border-rule bg-surface p-5"
              >
                <div className="font-heading text-[10px] font-semibold uppercase tracking-[0.18em] text-signal">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-2 font-heading text-base font-semibold text-ink">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{d.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
