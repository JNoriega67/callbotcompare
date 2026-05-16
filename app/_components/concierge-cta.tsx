import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export function ConciergeCTA() {
  return (
    <Section tone="white">
      <Container>
        <div className="rounded-card border border-border bg-sage/60 p-8 text-center md:p-12">
          <h2 className="font-heading text-3xl font-bold text-slate">Want help choosing?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-charcoal/85">
            If you do not want to sort through demos and feature lists yourself, tell us a little
            about your business and we will point you to the strongest options.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/quiz"
              className="rounded-[var(--radius-button)] bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[color:var(--brand-teal-hover)]"
            >
              Get a recommendation
            </Link>
            <Link
              href="/contact"
              className="rounded-[var(--radius-button)] border border-slate/30 bg-surface px-5 py-3 text-sm font-semibold text-slate transition-colors hover:border-slate/50"
            >
              Talk to us
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
