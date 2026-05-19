import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { EditorialMeta } from "@/components/marketing/editorial-meta";
import { JsonLd } from "@/components/marketing/json-ld";
import { VendorCard } from "@/components/vendors/vendor-card";
import { prisma } from "@/lib/db";
import { METHODOLOGY_CRITERIA } from "@/lib/constants";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Best AI Receptionist Software for Small Business",
  description:
    "Independent comparison of the best AI receptionist software for small business. Ranked by call handling, integrations, booking, ease of setup, and pricing.",
  path: "/best-ai-receptionist-software",
});

export const dynamic = "force-dynamic";

export default async function BestAIReceptionistPage() {
  const vendors = await prisma.vendor.findMany({
    where: { isPublished: true },
    orderBy: [{ overallScore: { sort: "desc", nulls: "last" } }, { name: "asc" }],
    take: 6,
  });

  return (
    <>
      <Section tone="paper" className="pt-10 pb-8 md:pt-14 md:pb-10">
        <Container className="space-y-5">
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/" },
              { label: "Best AI receptionist software", href: "/best-ai-receptionist-software" },
            ]}
          />
          <h1 className="font-heading text-3xl font-bold text-ink md:text-4xl">
            Best AI Receptionist Software for Small Business
          </h1>
          <EditorialMeta updated="2026-05" reviewCadence="Reviewed quarterly" />
          <p className="max-w-3xl text-ink-soft">
            An opinionated, independent ranking of AI receptionist and AI phone agent platforms
            for small and mid-sized service businesses. We score on call handling quality,
            integrations, booking, handoff, ease of setup, and pricing clarity — not feature counts.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/quiz"
              className="rounded-[var(--radius-button)] bg-signal px-5 py-3 font-heading text-[13px] font-semibold text-signal-ink transition-colors hover:bg-signal-hover"
            >
              Take the quiz
            </Link>
            <Link
              href="/compare"
              className="rounded-[var(--radius-button)] border border-ink/15 bg-surface px-5 py-3 font-heading text-[13px] font-semibold text-ink transition-colors hover:border-signal hover:text-signal"
            >
              Build a side-by-side
            </Link>
          </div>
        </Container>
      </Section>

      <Section tone="paper">
        <Container className="space-y-12">
          <div className="space-y-4">
            <h2 className="font-heading text-2xl font-semibold text-ink">Top picks</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {vendors.map((vendor) => (
                <VendorCard key={vendor.id} vendor={vendor} />
              ))}
            </div>
            <p className="text-sm text-muted-ink">
              Looking at every option? See the{" "}
              <Link href="/vendors" className="text-signal hover:underline">
                full directory
              </Link>
              .
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-heading text-2xl font-semibold text-ink">
              What we score (and why)
            </h2>
            <p className="max-w-3xl text-ink-soft">
              A vendor&apos;s marketing site rarely tells you what matters in production. We rank on
              the dimensions buyers consistently care about a year after rollout — not the ones
              that look good in a demo.
            </p>
            <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {METHODOLOGY_CRITERIA.map((c) => (
                <li
                  key={c.label}
                  className="rounded-[var(--radius-card)] border border-rule bg-surface p-4"
                >
                  <p className="font-heading text-sm font-semibold text-ink">{c.label}</p>
                  <p className="mt-1 text-xs text-muted-ink">{c.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <CtaBanner variant="matched" />
      <CtaBanner variant="setup" />

      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Home", href: "/" },
          { label: "Best AI receptionist software", href: "/best-ai-receptionist-software" },
        ])}
      />
    </>
  );
}
