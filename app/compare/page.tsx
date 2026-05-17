import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { CtaBanner } from "@/components/marketing/cta-banner";
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
      <Section tone="paper" className="pt-10 pb-8 md:pt-14 md:pb-10">
        <Container className="space-y-4">
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/" },
              { label: "Compare", href: "/compare" },
            ]}
          />
          <h1 className="font-heading text-3xl font-bold text-ink md:text-4xl">
            Build a side-by-side comparison
          </h1>
          <p className="max-w-2xl text-sm text-ink-soft">
            Pick the vendors you&apos;re seriously evaluating. We&apos;ll render a table you can share with
            anyone on your buying committee.
          </p>
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
