import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { VendorCard } from "@/components/vendors/vendor-card";
import { DirectoryControls } from "@/app/vendors/_components/directory-controls";
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
  title: "AI receptionist vendor directory",
  description:
    "The full CallTreo directory of AI receptionist and AI phone agent vendors. Filter by industry, capability, and integration; sort by editor score, price, or name.",
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

  const [vendors, verticals, features, totalPublished] = await Promise.all([
    prisma.vendor.findMany({ where, orderBy }),
    prisma.vertical.findMany({ orderBy: { name: "asc" }, select: { slug: true, name: true } }),
    prisma.feature.findMany({ orderBy: { name: "asc" }, select: { slug: true, name: true } }),
    prisma.vendor.count({ where: { isPublished: true } }),
  ]);

  return (
    <>
      {/* HERO */}
      <Section tone="paper" className="pt-10 pb-8 md:pt-14 md:pb-10">
        <Container className="space-y-6">
          <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Vendors", href: "/vendors" }]} />
          <div className="grid gap-6 md:grid-cols-[7fr_5fr] md:items-end md:gap-14">
            <div>
              <p className="font-heading text-[10px] font-semibold text-signal">
                Directory
              </p>
              <h1 className="mt-3 font-heading text-[2rem] font-bold leading-[1.05] tracking-tight text-ink md:text-[3.25rem]">
                AI receptionist vendors,{" "}
                <span className="font-light text-ink/70">ranked and filterable.</span>
              </h1>
            </div>
            <p className="text-base text-ink-soft md:text-lg">
              {totalPublished} vendors live in the directory. Filter by what you actually need —
              integrations, vertical fit, after-hours, handoff — and sort by editor score or
              starting price.
            </p>
          </div>
        </Container>
      </Section>

      {/* CONTROLS (search + sort + chips) */}
      <Section tone="paper" className="border-t border-rule pt-8 pb-6 md:pt-10 md:pb-8">
        <Container className="space-y-4">
          <div className="md:hidden">
            <MobileFilterSheet verticals={verticals} features={features} />
          </div>
          <DirectoryControls
            verticals={verticals}
            features={features}
            resultCount={vendors.length}
          />
        </Container>
      </Section>

      {/* GRID + SIDEBAR */}
      <Section tone="paper" className="pt-2 pb-20">
        <Container className="grid gap-10 md:grid-cols-[260px_1fr] md:items-start md:gap-12">
          <VendorFilters verticals={verticals} features={features} />
          <div className="space-y-10">
            {vendors.length === 0 ? (
              <div className="rounded-[var(--radius-card)] border border-dashed border-rule bg-surface p-10 text-center">
                <p className="font-heading text-2xl font-bold text-ink">
                  No vendors match these filters.
                </p>
                <p className="mt-3 text-ink-soft">
                  Loosen a filter or take the quiz for a guided recommendation across the full
                  directory.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <a
                    href="/quiz"
                    className="inline-flex items-center gap-2 rounded-[var(--radius-button)] bg-signal px-5 py-3 font-heading text-[13px] font-semibold text-signal-ink transition-colors hover:bg-signal-hover"
                  >
                    Take the quiz
                  </a>
                </div>
              </div>
            ) : (
              <>
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-2">
                  {vendors.map((vendor) => (
                    <VendorCard key={vendor.id} vendor={vendor} />
                  ))}
                </div>

                {/* Mid-grid help CTA — only when the user has SOMETHING to scroll */}
                {vendors.length >= 4 ? (
                  <CtaBanner variant="matched" tone="deep" />
                ) : null}

                {hasActiveFilters(filters) ? (
                  <p className="text-center text-sm text-muted-ink">
                    Filtered to {vendors.length} of {totalPublished}.{" "}
                    <Link
                      href="/vendors"
                      className="text-ink underline underline-offset-4 hover:text-signal"
                    >
                      Reset filters
                    </Link>
                  </p>
                ) : null}
              </>
            )}
          </div>
        </Container>
      </Section>

      {/* FINAL: setup CTA */}
      <Section tone="paper" className="border-t border-rule pb-20 pt-12 md:pt-16">
        <Container>
          <CtaBanner variant="setup" tone="ink" />
        </Container>
      </Section>
    </>
  );
}
