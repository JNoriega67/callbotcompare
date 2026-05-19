import type { Metadata } from "next";

import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { TrustStrip } from "@/components/marketing/trust-strip";
import { ComparisonStackedCards } from "@/components/comparisons/comparison-stacked-cards";
import { ComparisonTable } from "@/components/comparisons/comparison-table";
import { ComparePicker } from "@/app/compare/_components/compare-picker";
import { prisma } from "@/lib/db";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Compare AI receptionist vendors",
  description:
    "Pick up to 3 AI receptionist vendors and compare them side by side. Filter by booking, CRM integration, human handoff, and more.",
  path: "/compare",
});

export const dynamic = "force-dynamic";

type CompareHubProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function parseSelected(value: string | string[] | undefined): string[] {
  if (!value) return [];
  if (Array.isArray(value)) value = value[0];
  if (!value) return [];
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 3);
}

export default async function CompareHubPage({ searchParams }: CompareHubProps) {
  const params = await searchParams;
  const selectedSlugs = parseSelected(params.vendors);

  const [pickerVendors, seededComparisons] = await Promise.all([
    prisma.vendor.findMany({
      where: { isPublished: true },
      orderBy: [{ overallScore: { sort: "desc", nulls: "last" } }, { name: "asc" }],
      select: { slug: true, name: true, tagline: true, overallScore: true },
    }),
    prisma.comparisonPage.findMany({
      where: { status: "PUBLISHED" },
      select: {
        slug: true,
        vendors: { select: { vendor: { select: { slug: true } } } },
      },
    }),
  ]);

  const selectedVendors = selectedSlugs.length
    ? await prisma.vendor.findMany({
        where: { slug: { in: selectedSlugs }, isPublished: true },
      })
    : [];

  // Preserve URL order, drop any that resolved to nothing (unpublished/unknown).
  const orderedSelection = selectedSlugs
    .map((slug) => selectedVendors.find((v) => v.slug === slug))
    .filter((v): v is (typeof selectedVendors)[number] => Boolean(v));

  return (
    <>
      <Section tone="paper" className="pt-10 pb-10 md:pt-14 md:pb-12">
        <Container className="space-y-6">
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/" },
              { label: "Compare", href: "/compare" },
            ]}
          />
          <div className="grid gap-10 md:grid-cols-[7fr_5fr] md:items-end md:gap-14">
            <div>
              <p className="font-heading text-[10px] font-semibold text-signal">
                Side-by-side · Buyer tool
              </p>
              <h1 className="mt-3 font-heading text-[2.25rem] font-bold leading-[1.05] tracking-tight text-ink md:text-[3.5rem]">
                <span className="font-bold">Build a side-by-side</span>{" "}
                <span className="font-light text-ink/70">your buying committee can use.</span>
              </h1>
            </div>
            <div className="flex flex-col justify-end gap-5">
              <p className="text-base leading-relaxed text-ink-soft md:text-lg">
                Pick up to three vendors. We&apos;ll render a 9-column side-by-side scored against
                the same rubric we publish on every vendor page — shareable link, no signup.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/quiz"
                  className="inline-flex items-center gap-2 rounded-[var(--radius-button)] border border-ink/15 bg-surface px-4 py-2.5 font-heading text-[12px] font-semibold text-ink transition-colors hover:border-signal hover:text-signal"
                >
                  Not sure who to compare? Take the quiz
                </Link>
                <Link
                  href="/methodology"
                  className="font-heading text-[12px] font-semibold text-muted-ink underline-offset-4 hover:text-signal hover:underline"
                >
                  How we score →
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-rule pt-2">
            <TrustStrip
              items={[
                {
                  label: "Score dimensions",
                  value: "9",
                  href: "/methodology",
                },
                {
                  label: "Side-by-side max",
                  value: "3",
                },
                { label: "Mobile layout", value: "Cards" },
              ]}
            />
          </div>
        </Container>
      </Section>

      <Section tone="paper">
        <Container className="space-y-10">
          <ComparePicker
            vendors={pickerVendors}
            seededComparisons={seededComparisons.map((c) => ({
              slug: c.slug,
              vendorSlugs: c.vendors.map((cv) => cv.vendor.slug),
            }))}
          />

          {orderedSelection.length >= 2 ? (
            <div className="space-y-4">
              <h2 className="font-heading text-xl font-semibold text-ink">
                Your comparison ({orderedSelection.length})
              </h2>
              <div className="hidden md:block">
                <ComparisonTable vendors={orderedSelection} />
              </div>
              <div className="md:hidden">
                <ComparisonStackedCards vendors={orderedSelection} />
              </div>
            </div>
          ) : orderedSelection.length === 1 ? (
            <p className="rounded-[var(--radius-card)] border border-dashed border-rule bg-surface p-6 text-center text-sm text-muted-ink">
              Pick at least one more vendor to render the comparison.
            </p>
          ) : null}
        </Container>
      </Section>

      <CtaBanner variant="matched" />
    </>
  );
}
