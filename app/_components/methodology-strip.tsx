import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export function MethodologyStrip() {
  return (
    <Section tone="ink" className="py-10 md:py-12">
      <Container>
        <p className="text-center text-sm leading-relaxed text-over-ink/85 md:text-base">
          <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal-soft">
            How we evaluate ·{" "}
          </span>
          Call handling · integrations · automation · setup · vertical fit · escalation · reporting
          · pricing clarity · support.{" "}
          <Link
            href="/best-ai-receptionist-software"
            className="font-medium text-paper underline-offset-4 hover:underline"
          >
            Read the methodology →
          </Link>
        </p>
      </Container>
    </Section>
  );
}
