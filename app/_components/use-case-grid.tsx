import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { USE_CASE_CARDS } from "@/lib/constants";

export function UseCaseGrid() {
  return (
    <Section tone="white">
      <Container>
        <div className="mb-8 max-w-2xl">
          <h2 className="font-heading text-3xl font-bold text-slate">
            Find the right fit for your business
          </h2>
          <p className="mt-2 text-charcoal/80">
            The best AI receptionist for a law firm is not always the best one for a contractor or
            multi-location clinic. Compare tools by the environment they actually need to support.
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {USE_CASE_CARDS.map((card) => (
            <li key={card.verticalSlug}>
              <Link
                href={`/vendors?verticals=${card.verticalSlug}`}
                className="group block h-full rounded-card border border-border bg-surface p-5 transition-colors hover:border-teal"
              >
                <h3 className="font-heading text-lg font-semibold text-slate group-hover:text-teal">
                  {card.label}
                </h3>
                <p className="mt-2 text-sm text-charcoal/80">{card.blurb}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-teal">
                  Compare →
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
