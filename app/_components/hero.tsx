import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export function Hero() {
  return (
    <Section tone="paper" className="pt-16 pb-20 md:pt-24 md:pb-28">
      <Container>
        {/* Editorial masthead row */}
        <div className="flex items-baseline justify-between border-b border-rule pb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-ink">
          <span className="text-signal">CallTreo · Buyer Guide</span>
          <span>Updated 2026</span>
        </div>

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-[7fr_5fr] md:gap-14">
          <div>
            <h1 className="font-heading text-[2.4rem] leading-[1.05] tracking-tight text-ink md:text-[4rem]">
              <span className="font-bold">Compare AI receptionist software</span>{" "}
              <span className="block font-light text-ink/55 md:inline">
                without wasting weeks on demos.
              </span>
            </h1>
          </div>
          <div className="flex flex-col justify-end gap-6">
            <p className="text-lg leading-relaxed text-ink-soft md:text-xl">
              Independent rankings of AI receptionists, phone agents, and answering tools — scored
              on what actually matters in production: call handling, booking, integrations,
              after-hours, and time-to-launch.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/compare"
                className="inline-flex items-center gap-2 rounded-[var(--radius-button)] bg-ink px-5 py-3 font-heading text-[13px] font-semibold uppercase tracking-[0.08em] text-paper transition-colors hover:bg-signal"
              >
                Compare tools
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 rounded-[var(--radius-button)] border border-ink/15 bg-surface px-5 py-3 font-heading text-[13px] font-semibold uppercase tracking-[0.08em] text-ink transition-colors hover:border-signal hover:text-signal"
              >
                Take the quiz
              </Link>
              <Link
                href="/contact"
                className="ml-1 font-heading text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-ink underline-offset-4 hover:text-signal hover:underline"
              >
                or talk to us
              </Link>
            </div>
          </div>
        </div>

        {/* Stat band */}
        <dl className="mt-16 grid grid-cols-3 border-y border-rule">
          {[
            { k: "8", v: "Vendors compared" },
            { k: "9", v: "Scoring criteria" },
            { k: "7", v: "Verticals covered" },
          ].map((stat, i) => (
            <div
              key={stat.v}
              className={
                i < 2
                  ? "border-r border-rule px-2 py-6 md:px-6 md:py-8"
                  : "px-2 py-6 md:px-6 md:py-8"
              }
            >
              <dt className="font-heading text-[2.4rem] font-bold leading-none text-ink md:text-[3.25rem]">
                {stat.k}
              </dt>
              <dd className="mt-2 font-heading text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-ink">
                {stat.v}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
