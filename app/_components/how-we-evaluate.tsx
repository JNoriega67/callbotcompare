import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { METHODOLOGY_CRITERIA } from "@/lib/constants";

export function HowWeEvaluate() {
  return (
    <Section tone="sage">
      <Container className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:items-start">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">
            Methodology
          </p>
          <h2 className="font-heading text-3xl font-bold text-slate">
            How we evaluate vendors
          </h2>
          <p className="text-charcoal/85">
            We score vendors across call handling quality, integrations, workflow automation, ease
            of setup, pricing clarity, vertical fit, escalation options, reporting, and onboarding
            support.
          </p>
          <p className="text-charcoal/85">
            We do not assume every business needs the same thing. The right tool depends on your
            call volume, workflow, and tolerance for complexity.
          </p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {METHODOLOGY_CRITERIA.map((c) => (
            <li
              key={c.label}
              className="rounded-card border border-border bg-surface p-4"
            >
              <p className="font-heading text-sm font-semibold text-slate">{c.label}</p>
              <p className="mt-1 text-xs text-muted">{c.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
