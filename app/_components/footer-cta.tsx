import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export function FooterCTA() {
  return (
    <Section tone="paper" className="border-t border-rule-strong py-16 md:py-20">
      <Container className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
        <h2 className="font-display text-3xl leading-[1.1] md:text-4xl">
          Compare AI receptionist tools{" "}
          <span className="italic text-ink-soft">with a clearer process.</span>
        </h2>
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
      </Container>
    </Section>
  );
}
