import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export default function HomePage() {
  return (
    <>
      <Section tone="cream">
        <Container className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">
              Buyer guide · Updated 2026
            </p>
            <h1 className="text-balance text-4xl font-bold md:text-5xl">
              Compare AI receptionist software without wasting weeks on demos.
            </h1>
            <p className="max-w-xl text-lg text-charcoal/80">
              Side-by-side comparisons of AI receptionist and AI phone agent vendors, ranked
              against a transparent rubric tuned for small and mid-sized service businesses.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/compare"
                className="rounded-[var(--radius-button)] bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[color:var(--brand-teal-hover)]"
              >
                Compare tools
              </Link>
              <Link
                href="/quiz"
                className="rounded-[var(--radius-button)] border border-slate/20 bg-surface px-5 py-3 text-sm font-semibold text-slate transition-colors hover:border-slate/40"
              >
                Take the quiz
              </Link>
            </div>
          </div>
          <div className="rounded-[var(--radius-card)] border border-border bg-surface p-6 shadow-[var(--shadow-card)]">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              Brand foundation
            </p>
            <p className="mt-3 text-sm text-charcoal/80">
              Phase&nbsp;1 placeholder — fonts (Montserrat headings, Inter body), brand palette,
              header and footer in place. Real homepage sections land in Phase&nbsp;5.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
