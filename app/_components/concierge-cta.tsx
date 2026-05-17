import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export function ConciergeCTA() {
  return (
    <Section tone="ink" className="py-20 md:py-28">
      <Container>
        <div className="grid gap-10 md:grid-cols-[7fr_5fr] md:items-end md:gap-16">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-signal">
              Want help choosing?
            </p>
            <h2 className="mt-3 font-display text-3xl leading-[1.1] text-paper md:text-5xl">
              Skip the demos. Tell us about your business and we'll point you at the strongest
              options.
            </h2>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <Link
              href="/quiz"
              className="rounded-[var(--radius-button)] bg-signal px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-signal-ink transition-colors hover:bg-signal-hover"
            >
              Take the quiz
            </Link>
            <Link
              href="/contact"
              className="text-sm uppercase tracking-[0.08em] text-paper/70 underline-offset-4 hover:text-paper hover:underline"
            >
              or talk to us →
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
