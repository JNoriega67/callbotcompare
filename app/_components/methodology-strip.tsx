import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { METHODOLOGY_CRITERIA } from "@/lib/constants";

export function MethodologyStrip() {
  // First 5 of 9 criteria — the strip is a glanceable summary; full
  // editorial lives in <HowWeEvaluate />.
  const criteria = METHODOLOGY_CRITERIA.slice(0, 5);

  return (
    <Section tone="white" className="py-12 md:py-14">
      <Container>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          We rank vendors on what buyers actually use
        </p>
        <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-5">
          {criteria.map((c) => (
            <li key={c.label} className="text-center md:text-left">
              <p className="font-heading text-sm font-semibold text-slate">{c.label}</p>
              <p className="mt-1 text-xs text-muted">{c.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
