import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { USE_CASE_CARDS } from "@/lib/constants";

export function UseCaseGrid() {
  return (
    <Section tone="paper">
      <Container>
        <div className="grid gap-6 md:grid-cols-[5fr_7fr] md:gap-16">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-signal">
              Browse by vertical
            </p>
            <h2 className="mt-3 font-display text-3xl leading-[1.1] md:text-4xl">
              The best AI receptionist for a law firm isn't the best one for a contractor.
            </h2>
            <p className="mt-4 text-ink-soft">
              Compare tools by the environment they actually need to support.
            </p>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2">
            {USE_CASE_CARDS.map((card, i) => (
              <li
                key={card.verticalSlug}
                className={
                  // Hairline grid using only borders — no card chrome.
                  "border-b border-rule-strong " +
                  (i % 2 === 0 ? "sm:border-r" : "")
                }
              >
                <Link
                  href={`/vendors?verticals=${card.verticalSlug}`}
                  className="group block px-1 py-5 transition-colors hover:bg-paper-deep md:px-5"
                >
                  <p className="font-display text-xl text-ink group-hover:text-signal md:text-2xl">
                    {card.label}
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">{card.blurb}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
