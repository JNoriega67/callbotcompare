import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { FEATURE_TILES } from "@/lib/constants";

function tileHref(tile: (typeof FEATURE_TILES)[number]): string {
  if ("capability" in tile) return `/vendors?capabilities=${tile.capability}`;
  return `/vendors?features=${tile.featureSlug}`;
}

export function FeatureTiles() {
  return (
    <Section tone="deep">
      <Container>
        <div className="grid gap-6 md:grid-cols-[5fr_7fr] md:gap-16">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-signal">
              Browse by feature
            </p>
            <h2 className="mt-3 font-display text-3xl leading-[1.1] md:text-4xl">
              Drill in by the capability that actually drives the decision.
            </h2>
          </div>

          {/* Two-column linklist with hairline dividers — reads like an index, not a tile grid */}
          <ul className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12">
            {FEATURE_TILES.map((tile) => (
              <li key={tile.label}>
                <Link
                  href={tileHref(tile)}
                  className="group flex items-baseline justify-between gap-4 border-b border-rule-strong py-4 text-base text-ink hover:text-signal"
                >
                  <span className="font-display text-lg md:text-xl">{tile.label}</span>
                  <span
                    aria-hidden
                    className="text-sm text-muted-ink transition-colors group-hover:text-signal"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
