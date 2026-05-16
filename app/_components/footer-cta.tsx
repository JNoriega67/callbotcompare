import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export function FooterCTA() {
  return (
    <Section tone="sage" className="py-12 md:py-16">
      <Container className="flex flex-col items-center gap-5 text-center">
        <h2 className="font-heading text-3xl font-bold text-slate">
          Compare AI receptionist tools with a clearer process
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/compare"
            className="rounded-[var(--radius-button)] bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[color:var(--brand-teal-hover)]"
          >
            Compare tools
          </Link>
          <Link
            href="/quiz"
            className="rounded-[var(--radius-button)] border border-slate/30 bg-surface px-5 py-3 text-sm font-semibold text-slate transition-colors hover:border-slate/50"
          >
            Take the quiz
          </Link>
        </div>
      </Container>
    </Section>
  );
}
