import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export function Hero() {
  return (
    <Section tone="paper" className="pt-16 pb-20 md:pt-24 md:pb-28">
      <Container>
        {/* Editorial masthead — date + section, like the top of a print page */}
        <div className="flex items-baseline justify-between border-b border-rule-strong pb-3 text-[11px] uppercase tracking-[0.22em] text-ink-soft">
          <span>Vol. 01 · Buyer Guide</span>
          <span>Updated 2026</span>
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-[7fr_5fr] md:gap-16">
          <div>
            <h1 className="font-display text-[2.5rem] leading-[1.05] tracking-tight md:text-[4.2rem]">
              Compare AI receptionist software{" "}
              <span className="italic text-ink-soft">without wasting weeks on demos.</span>
            </h1>
          </div>
          <div className="flex flex-col justify-end gap-6">
            <p className="text-lg leading-relaxed text-ink-soft md:text-xl">
              An independent comparison of AI receptionists, phone agents, and answering tools —
              ranked on what actually matters in production: call handling, booking, integrations,
              after-hours, and how long it takes to launch.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/compare"
                className="rounded-[var(--radius-button)] bg-ink px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-paper transition-colors hover:bg-signal"
              >
                Compare tools
              </Link>
              <Link
                href="/quiz"
                className="rounded-[var(--radius-button)] border border-ink px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                Take the quiz
              </Link>
            </div>
          </div>
        </div>

        {/* Stat band — editorial, three real numbers, separated by hairline rules */}
        <dl className="mt-16 grid grid-cols-3 border-y border-rule-strong">
          {[
            { k: "8", v: "Vendors compared" },
            { k: "9", v: "Scoring criteria" },
            { k: "7", v: "Verticals covered" },
          ].map((stat, i) => (
            <div
              key={stat.v}
              className={
                i < 2
                  ? "border-r border-rule-strong px-2 py-6 md:px-6 md:py-8"
                  : "px-2 py-6 md:px-6 md:py-8"
              }
            >
              <dt className="font-display text-[2.5rem] font-medium leading-none md:text-[3.5rem]">
                {stat.k}
              </dt>
              <dd className="mt-2 text-[11px] uppercase tracking-[0.18em] text-muted-ink">
                {stat.v}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
