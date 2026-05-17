import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export function MethodologyStrip() {
  return (
    <Section tone="ink" className="py-12 md:py-14">
      <Container>
        <p className="text-center text-sm leading-relaxed text-paper md:text-base">
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-paper/60">
            How we evaluate ·{" "}
          </span>
          Call handling, integrations, automation, setup complexity, vertical fit, escalation,
          reporting, pricing clarity, support. Read the rubric →{" "}
          <a href="/best-ai-receptionist-software" className="text-signal underline-offset-4 hover:underline">
            our methodology
          </a>
          .
        </p>
      </Container>
    </Section>
  );
}
