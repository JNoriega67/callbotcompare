import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { METHODOLOGY_CRITERIA } from "@/lib/constants";

export function HowWeEvaluate() {
  return (
    <Section tone="paper">
      <Container>
        <div className="grid gap-10 md:grid-cols-[5fr_7fr] md:gap-16">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-signal">
              Methodology
            </p>
            <h2 className="mt-3 font-display text-3xl leading-[1.1] md:text-4xl">
              How we evaluate vendors.
            </h2>
            <p className="mt-4 text-ink-soft">
              We score across nine dimensions, weighted by how much they matter to a real
              small-business buyer. We don't assume every business needs the same thing — the right
              tool depends on call volume, workflow, and tolerance for complexity.
            </p>
          </div>
          <dl className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12">
            {METHODOLOGY_CRITERIA.map((c, i) => (
              <div
                key={c.label}
                className="grid grid-cols-[2rem_1fr] items-baseline gap-4 border-b border-rule-strong py-5"
              >
                <dt className="font-display text-base text-muted-ink">
                  {String(i + 1).padStart(2, "0")}
                </dt>
                <dd>
                  <p className="font-display text-lg text-ink">{c.label}</p>
                  <p className="mt-1 text-sm text-ink-soft">{c.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </Section>
  );
}
