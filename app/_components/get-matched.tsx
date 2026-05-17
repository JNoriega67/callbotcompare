import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

/**
 * Mid-page quiz CTA. Sits between TopPicks and UseCaseGrid so buyers who
 * don't want to scroll the whole directory have an early on-ramp to the
 * quiz. Soft teal wash so it reads as advisory, not affiliate.
 */
export function GetMatched() {
  return (
    <Section tone="paper" className="py-16 md:py-20">
      <Container>
        <div className="rounded-[var(--radius-card)] border border-rule bg-signal-soft/60 p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center md:gap-12">
            <div>
              <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
                Get matched
              </p>
              <h2 className="mt-3 font-heading text-2xl font-bold leading-tight text-ink md:text-[2rem]">
                Get matched to the right AI receptionist in five questions.
              </h2>
              <p className="mt-3 max-w-xl text-ink-soft">
                Tell us your industry, call volume, and what the AI actually needs to do. We&apos;ll
                surface the two or three strongest fits — no demos, no email gate. You see the
                results first, then decide if you want our concierge to walk you through them.
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
              <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-ink">
                ~2 minutes · No email required
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
