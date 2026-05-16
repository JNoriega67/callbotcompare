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
    <Section tone="cream">
      <Container>
        <div className="mb-8 max-w-2xl">
          <h2 className="font-heading text-3xl font-bold text-slate">
            Compare the features buyers care about most
          </h2>
          <p className="mt-2 text-charcoal/80">
            Drill into the directory by the capability that actually drives your decision.
          </p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {FEATURE_TILES.map((tile) => (
            <li key={tile.label}>
              <Link
                href={tileHref(tile)}
                className="block rounded-[var(--radius-card)] border border-border bg-surface px-4 py-5 text-sm font-medium text-slate transition-colors hover:border-teal hover:text-teal"
              >
                {tile.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
