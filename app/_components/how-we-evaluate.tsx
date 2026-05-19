import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { METHODOLOGY_CRITERIA } from "@/lib/constants";

export function HowWeEvaluate() {
  return (
    <Section tone="tint">
      <Container>
        <div className="grid gap-10 md:grid-cols-[5fr_7fr] md:gap-16">
          <div>
            <p className="font-heading text-[10px] font-semibold text-signal">
              Methodology
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-[1.1] text-ink md:text-4xl">
              How we evaluate vendors.
            </h2>
            <p className="mt-4 text-ink-soft">
              Nine dimensions, weighted by how much they matter to a real small-business buyer. We
              don&apos;t assume every business needs the same thing — the right tool depends on call
              volume, workflow, and tolerance for complexity.
            </p>
          </div>
          <dl className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12">
            {METHODOLOGY_CRITERIA.map((c, i) => (
              <div
                key={c.label}
                className="grid grid-cols-[2rem_1fr] items-baseline gap-4 border-b border-rule py-5"
              >
                <dt className="font-heading text-base font-bold tabular-nums text-muted-ink">
                  {String(i + 1).padStart(2, "0")}
                </dt>
                <dd>
                  <p className="font-heading text-base font-semibold text-ink">{c.label}</p>
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
