import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { TrustStrip } from "@/components/marketing/trust-strip";
import { COMMERCIAL_PAGES } from "@/lib/commercial-pages";
import { GUIDES } from "@/lib/guides";
import { INTEGRATION_PAGES } from "@/lib/integration-pages";
import { prisma } from "@/lib/db";
import { WEIGHTS } from "@/lib/scoring";

export async function Hero() {
  // Dynamic stats — drive from registries + the live vendor pool so the
  // hero stays current as the site grows.
  const vendorCount = await prisma.vendor.count({ where: { isPublished: true } });
  const integrationCount = Object.keys(INTEGRATION_PAGES).length;
  const segmentCount = Object.keys(COMMERCIAL_PAGES).length;
  const guideCount = Object.keys(GUIDES).length;
  const criteriaCount = Object.keys(WEIGHTS).length;

  return (
    <Section tone="paper" className="pt-16 pb-20 md:pt-24 md:pb-24">
      <Container>
        {/* Editorial masthead row */}
        <div className="flex items-baseline justify-between border-b border-rule pb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-ink">
          <span className="text-signal">CallTreo · Buyer Guide</span>
          <span className="flex items-center gap-4">
            <Link
              href="/methodology"
              className="hidden underline-offset-4 hover:text-signal hover:underline md:inline"
            >
              Methodology
            </Link>
            <span>Updated 2026</span>
          </span>
        </div>

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-[7fr_5fr] md:gap-14">
          <div>
            <h1 className="font-heading text-[2.4rem] leading-[1.05] tracking-tight text-ink md:text-[4rem]">
              <span className="font-bold">Compare AI receptionist software</span>{" "}
              <span className="block font-light text-ink/55 md:inline">
                without wasting weeks on demos.
              </span>
            </h1>
          </div>
          <div className="flex flex-col justify-end gap-6">
            <p className="text-lg leading-relaxed text-ink-soft md:text-xl">
              Independent rankings of AI receptionists, phone agents, and answering tools — scored
              on what actually matters in production: call handling, booking, integrations,
              after-hours, and time-to-launch.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/compare"
                className="inline-flex items-center gap-2 rounded-[var(--radius-button)] bg-ink px-5 py-3 font-heading text-[13px] font-semibold uppercase tracking-[0.08em] text-paper transition-colors hover:bg-signal"
              >
                Compare tools
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 rounded-[var(--radius-button)] border border-ink/15 bg-surface px-5 py-3 font-heading text-[13px] font-semibold uppercase tracking-[0.08em] text-ink transition-colors hover:border-signal hover:text-signal"
              >
                Take the quiz
              </Link>
              <Link
                href="/contact"
                className="ml-1 font-heading text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-ink underline-offset-4 hover:text-signal hover:underline"
              >
                or talk to us
              </Link>
            </div>
          </div>
        </div>

        {/* Dynamic trust strip */}
        <div className="mt-14 border-y border-rule">
          <TrustStrip
            items={[
              { label: "Vendors scored", value: String(vendorCount), href: "/vendors" },
              { label: "Buyer segments", value: String(segmentCount), href: "/best-ai-receptionist-software" },
              { label: "Integrations covered", value: String(integrationCount), href: "/ai-receptionist-with-hubspot" },
              { label: "Implementation guides", value: String(guideCount), href: "/guides" },
            ]}
          />
        </div>

        {/* Tiny editorial commitment line */}
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-ink">
          Scored against{" "}
          <Link
            href="/methodology"
            className="text-ink underline underline-offset-4 hover:text-signal"
          >
            {criteriaCount} weighted criteria
          </Link>{" "}
          · referral relationships{" "}
          <Link
            href="/disclosure"
            className="text-ink underline underline-offset-4 hover:text-signal"
          >
            disclosed
          </Link>{" "}
          · no fabricated vendor claims.
        </p>
      </Container>
    </Section>
  );
}
