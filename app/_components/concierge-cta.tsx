import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export function ConciergeCTA() {
  return (
    <Section tone="ink" className="py-20 md:py-24">
      <Container>
        <div className="grid gap-10 md:grid-cols-[7fr_5fr] md:items-end md:gap-16">
          <div>
            <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-over-ink/70">
              Want help choosing?
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-[1.1] text-paper md:text-[2.75rem]">
              Skip the demos. Tell us about your business and we&apos;ll point you at the strongest
              two or three options.
            </h2>
            <p className="mt-4 max-w-xl text-base text-over-ink/80">
              No sales calls. A short email back with the shortlist and the reasons — usually within
              one business day.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 rounded-[var(--radius-button)] bg-signal px-5 py-3 font-heading text-[13px] font-semibold uppercase tracking-[0.08em] text-signal-ink transition-colors hover:bg-signal-hover"
            >
              Take the quiz
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/contact"
              className="font-heading text-[12px] font-semibold uppercase tracking-[0.14em] text-over-ink/70 underline-offset-4 hover:text-paper hover:underline"
            >
              or talk to us
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
