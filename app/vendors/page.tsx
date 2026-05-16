import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { VendorCard } from "@/components/vendors/vendor-card";
import { MobileFilterSheet } from "@/app/vendors/_components/mobile-filter-sheet";
import { VendorFilters } from "@/app/vendors/_components/vendor-filters";
import { prisma } from "@/lib/db";
import {
  filtersToOrderBy,
  filtersToPrismaWhere,
  hasActiveFilters,
  parseFilters,
} from "@/lib/filters";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "All AI receptionist vendors",
  description:
    "Browse every AI receptionist and AI phone agent vendor in our directory. Filter by industry, integration, booking, handoff, and more.",
  path: "/vendors",
});

export const dynamic = "force-dynamic";

type VendorsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function VendorsPage({ searchParams }: VendorsPageProps) {
  const params = await searchParams;
  const filters = parseFilters(params);
  const where = filtersToPrismaWhere(filters);
  const orderBy = filtersToOrderBy(filters);

  const [vendors, verticals, features] = await Promise.all([
    prisma.vendor.findMany({ where, orderBy }),
    prisma.vertical.findMany({ orderBy: { name: "asc" }, select: { slug: true, name: true } }),
    prisma.feature.findMany({ orderBy: { name: "asc" }, select: { slug: true, name: true } }),
  ]);

  const totalPublished = await prisma.vendor.count({ where: { isPublished: true } });

  return (
    <>
      <Section tone="cream" className="pt-10 pb-8 md:pt-14 md:pb-10">
        <Container className="space-y-4">
          <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Vendors", href: "/vendors" }]} />
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-heading text-3xl font-bold text-slate md:text-4xl">
                AI receptionist directory
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-charcoal/80">
                {totalPublished} published vendors. Filter to match your industry, call volume, and
                must-have integrations.
              </p>
            </div>
            <MobileFilterSheet verticals={verticals} features={features} />
          </div>
        </Container>
      </Section>

      <Section tone="white" className="pt-0 pb-20">
        <Container className="grid gap-8 md:grid-cols-[260px_1fr] md:items-start">
          <VendorFilters verticals={verticals} features={features} />
          <div>
            <div className="mb-4 flex items-center justify-between text-sm text-muted">
              <span>
                {vendors.length} {vendors.length === 1 ? "result" : "results"}
                {hasActiveFilters(filters) ? " (filtered)" : ""}
              </span>
            </div>
            {vendors.length === 0 ? (
              <div className="rounded-card border border-dashed border-border bg-surface p-10 text-center">
                <p className="font-heading text-lg font-semibold text-slate">
                  No vendors match these filters.
                </p>
                <p className="mt-2 text-sm text-muted">
                  Try clearing some filters, or take the quiz for a guided recommendation.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
                {vendors.map((vendor) => (
                  <VendorCard key={vendor.id} vendor={vendor} />
                ))}
              </div>
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}
