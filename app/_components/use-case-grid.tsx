import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { USE_CASE_CARDS } from "@/lib/constants";

export function UseCaseGrid() {
  return (
    <Section tone="paper">
      <Container>
        <div className="grid gap-10 md:grid-cols-[5fr_7fr] md:gap-16">
          <div>
            <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
              Browse by vertical
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-[1.1] text-ink md:text-4xl">
              The best AI receptionist for a law firm isn&apos;t the best one for a contractor.
            </h2>
            <p className="mt-4 text-ink-soft">
              Compare tools by the environment they actually need to support.
            </p>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2">
            {USE_CASE_CARDS.map((card, i) => {
              const href =
                "landingHref" in card && card.landingHref
                  ? card.landingHref
                  : `/vendors?verticals=${card.verticalSlug}`;
              return (
              <li
                key={card.verticalSlug}
                className={
                  "border-b border-rule " + (i % 2 === 0 ? "sm:border-r" : "")
                }
              >
                <Link
                  href={href}
                  className="group flex h-full items-baseline justify-between gap-4 px-1 py-5 transition-colors hover:bg-paper-deep md:px-5"
                >
                  <span>
                    <p className="font-heading text-lg font-semibold text-ink group-hover:text-signal md:text-xl">
                      {card.label}
                    </p>
                    <p className="mt-1 text-sm text-ink-soft">{card.blurb}</p>
                  </span>
                  <span
                    aria-hidden
                    className="font-heading text-sm text-muted-ink transition-colors group-hover:text-signal"
                  >
                    →
                  </span>
                </Link>
              </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
