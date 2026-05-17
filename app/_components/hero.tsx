import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export function Hero() {
  return (
    <Section tone="cream" className="pt-12 pb-16 md:pt-16 md:pb-20">
      <Container className="grid items-center gap-12 md:grid-cols-[1.2fr_1fr]">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">
            Independent buyer guide · Updated 2026
          </p>
          <h1 className="text-balance text-4xl font-bold leading-tight md:text-5xl">
            Compare AI receptionist software without wasting weeks on demos.
          </h1>
          <p className="max-w-xl text-lg text-charcoal/85">
            CallTreo helps small businesses evaluate AI receptionists, phone agents, and answering
            tools by the things that actually matter: call handling, booking, integrations,
            after-hours coverage, and setup complexity.
          </p>
          <ul className="grid gap-2 text-sm text-charcoal/85">
            {[
              "Compare vendors side by side",
              "See best-fit recommendations by industry",
              "Get help choosing the right tool for your workflow",
            ].map((bullet) => (
              <li key={bullet} className="flex items-start gap-2">
                <span
                  aria-hidden
                  className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-teal"
                />
                {bullet}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/compare"
              className="rounded-[var(--radius-button)] bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[color:var(--brand-teal-hover)]"
            >
              Compare tools
            </Link>
            <Link
              href="/quiz"
              className="rounded-[var(--radius-button)] border border-slate/25 bg-surface px-5 py-3 text-sm font-semibold text-slate transition-colors hover:border-slate/50"
            >
              Take the quiz
            </Link>
          </div>
        </div>
        <div className="rounded-card border border-border bg-surface p-6 shadow-[var(--shadow-card)]">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Preview · Side-by-side
          </p>
          <div className="mt-4 divide-y divide-border text-sm">
            <div className="grid grid-cols-[1fr_auto] items-baseline gap-4 py-3">
              <div>
                <p className="font-heading font-semibold text-slate">Smith.ai</p>
                <p className="text-xs text-muted">AI + human receptionist hybrid</p>
              </div>
              <p className="font-heading text-lg font-bold text-slate">8.8</p>
            </div>
            <div className="grid grid-cols-[1fr_auto] items-baseline gap-4 py-3">
              <div>
                <p className="font-heading font-semibold text-slate">Dialzara</p>
                <p className="text-xs text-muted">AI-first with public pricing</p>
              </div>
              <p className="font-heading text-lg font-bold text-slate">8.3</p>
            </div>
            <div className="grid grid-cols-[1fr_auto] items-baseline gap-4 py-3">
              <div>
                <p className="font-heading font-semibold text-slate">Goodcall</p>
                <p className="text-xs text-muted">Lightweight AI answering for SMBs</p>
              </div>
              <p className="font-heading text-lg font-bold text-slate">8.1</p>
            </div>
          </div>
          <p className="mt-4 text-[10px] uppercase tracking-wider text-muted">
            Editor scores · Out of 10
          </p>
        </div>
      </Container>
    </Section>
  );
}
