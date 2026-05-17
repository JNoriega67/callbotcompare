import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { FEATURE_TILES } from "@/lib/constants";

const CAPABILITY_LANDING: Partial<Record<string, string>> = {
  booking: "/best-ai-answering-service-for-appointment-booking",
  crm: "/best-ai-phone-agent-with-crm-integration",
};

function tileHref(tile: (typeof FEATURE_TILES)[number]): string {
  if ("capability" in tile) {
    return CAPABILITY_LANDING[tile.capability] ?? `/vendors?capabilities=${tile.capability}`;
  }
  return `/vendors?features=${tile.featureSlug}`;
}

export function FeatureTiles() {
  return (
    <Section tone="deep">
      <Container>
        <div className="grid gap-10 md:grid-cols-[5fr_7fr] md:gap-16">
          <div>
            <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
              Browse by feature
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-[1.1] text-ink md:text-4xl">
              Drill in by the capability that actually drives the decision.
            </h2>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12">
            {FEATURE_TILES.map((tile) => (
              <li key={tile.label}>
                <Link
                  href={tileHref(tile)}
                  className="group flex items-baseline justify-between gap-4 border-b border-rule py-4 text-base text-ink hover:text-signal"
                >
                  <span className="font-heading text-lg font-semibold md:text-xl">{tile.label}</span>
                  <span
                    aria-hidden
                    className="font-heading text-sm text-muted-ink transition-colors group-hover:text-signal"
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
