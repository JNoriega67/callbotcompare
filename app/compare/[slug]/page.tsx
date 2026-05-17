import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { JsonLd } from "@/components/marketing/json-ld";
import { ComparisonStackedCards } from "@/components/comparisons/comparison-stacked-cards";
import { ComparisonTable } from "@/components/comparisons/comparison-table";
import { RelatedBlock } from "@/app/compare/[slug]/_components/related-block";
import { VendorProfileCard } from "@/app/compare/[slug]/_components/vendor-profile-card";
import { VerdictBlock } from "@/app/compare/[slug]/_components/verdict-block";
import { prisma } from "@/lib/db";
import { formatScore } from "@/lib/scoring";
import { breadcrumbJsonLd, buildMetadata, comparisonJsonLd } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

type Params = Promise<{ slug: string }>;

async function loadComparison(slug: string) {
  return prisma.comparisonPage.findFirst({
    where: { slug, status: "PUBLISHED" },
    include: {
      vendors: {
        orderBy: { position: "asc" },
        include: { vendor: true },
      },
    },
  });
}

/**
 * Light editorial heuristic that picks one differentiator phrase per
 * vendor based on actual seed fields — never fabricates a feature.
 */
function buildPickIf(
  thisVendor: {
    slug: string;
    setupComplexity: number | null;
    pricingFromUsd: number | null;
    hipaaFriendly: boolean | null;
    hasHumanHandoff: boolean | null;
    hasMultilingual: boolean | null;
    has24x7: boolean | null;
    hasCrmIntegration: boolean | null;
  },
  other: typeof thisVendor,
): string | undefined {
  // Cheaper than the other published vendor
  if (
    thisVendor.pricingFromUsd !== null &&
    (other.pricingFromUsd === null || thisVendor.pricingFromUsd < other.pricingFromUsd)
  ) {
    return "you want transparent, lower-cost entry pricing.";
  }
  // Easier setup
  if (
    thisVendor.setupComplexity !== null &&
    other.setupComplexity !== null &&
    thisVendor.setupComplexity < other.setupComplexity
  ) {
    return "you want to go live faster with less hands-on configuration.";
  }
  // Capability differentiators (only when the other vendor lacks it)
  if (thisVendor.hipaaFriendly === true && other.hipaaFriendly !== true) {
    return "you need HIPAA-friendly workflows for healthcare intake.";
  }
  if (thisVendor.hasHumanHandoff === true && other.hasHumanHandoff !== true) {
    return "you want a human safety net on tricky or high-value calls.";
  }
  if (thisVendor.hasMultilingual === true && other.hasMultilingual !== true) {
    return "your callers need multilingual coverage.";
  }
  if (thisVendor.has24x7 === true && other.has24x7 !== true) {
    return "you need 24/7 coverage including overnight and weekends.";
  }
  if (thisVendor.hasCrmIntegration === true && other.hasCrmIntegration !== true) {
    return "your CRM needs to receive caller data automatically.";
  }
  return undefined;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const page = await loadComparison(slug);
  if (!page) {
    return buildMetadata({
      title: "Comparison not found",
      description: "",
      path: `/compare/${slug}`,
      noIndex: true,
    });
  }
  return buildMetadata({
    title: page.metaTitle ?? page.title,
    description: page.metaDescription ?? page.intro ?? page.verdict ?? page.title,
    path: `/compare/${slug}`,
  });
}

export default async function ComparisonDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const page = await loadComparison(slug);
  if (!page) notFound();

  const vendors = page.vendors.map((cv) => cv.vendor);
  const vendorIds = vendors.map((v) => v.id);

  const [relatedComparisons, relatedVendors] = await Promise.all([
    // Other comparisons that share at least one vendor with this one.
    prisma.comparisonPage.findMany({
      where: {
        status: "PUBLISHED",
        NOT: { id: page.id },
        vendors: { some: { vendorId: { in: vendorIds } } },
      },
      take: 3,
      include: {
        vendors: { orderBy: { position: "asc" }, include: { vendor: { select: { name: true } } } },
      },
      orderBy: { updatedAt: "desc" },
    }),
    // Top published vendors NOT in this comparison.
    prisma.vendor.findMany({
      where: { isPublished: true, NOT: { id: { in: vendorIds } } },
      orderBy: [{ overallScore: { sort: "desc", nulls: "last" } }, { name: "asc" }],
      take: 4,
      select: { slug: true, name: true, tagline: true, overallScore: true },
    }),
  ]);

  // For headline stat row
  const [a, b] = vendors;

  return (
    <>
      {/* ABOVE-THE-FOLD */}
      <Section tone="paper" className="pt-10 pb-10 md:pt-14 md:pb-12">
        <Container className="space-y-6">
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/" },
              { label: "Compare", href: "/compare" },
              { label: page.title, href: `/compare/${page.slug}` },
            ]}
          />
          <div className="grid gap-10 md:grid-cols-[7fr_5fr] md:items-end md:gap-14">
            <div>
              <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
                Head to head · {vendors.length} vendors
              </p>
              <h1 className="mt-3 font-heading text-[2.2rem] font-bold leading-[1.05] tracking-tight text-ink md:text-[3.5rem]">
                {page.title}
              </h1>
            </div>

            {/* Score-vs-score stat for quick scan */}
            {a && b ? (
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 border-y border-rule py-5">
                <div className="text-center">
                  <p className="font-heading text-xs font-semibold uppercase tracking-[0.16em] text-muted-ink">
                    {a.name}
                  </p>
                  <p className="mt-1 font-heading text-4xl font-bold tabular-nums text-ink">
                    {formatScore(a.overallScore)}
                  </p>
                </div>
                <div className="font-heading text-xs font-semibold uppercase tracking-[0.18em] text-muted-ink">
                  vs
                </div>
                <div className="text-center">
                  <p className="font-heading text-xs font-semibold uppercase tracking-[0.16em] text-muted-ink">
                    {b.name}
                  </p>
                  <p className="mt-1 font-heading text-4xl font-bold tabular-nums text-ink">
                    {formatScore(b.overallScore)}
                  </p>
                </div>
              </div>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 rounded-[var(--radius-button)] bg-ink px-5 py-3 font-heading text-[13px] font-semibold uppercase tracking-[0.08em] text-paper transition-colors hover:bg-signal"
            >
              Get matched in 5 questions
              <span aria-hidden>→</span>
            </Link>
            <Link
              href={`/compare?vendors=${vendors.map((v) => v.slug).join(",")}`}
              className="inline-flex items-center gap-2 rounded-[var(--radius-button)] border border-ink/15 bg-surface px-5 py-3 font-heading text-[13px] font-semibold uppercase tracking-[0.08em] text-ink transition-colors hover:border-signal hover:text-signal"
            >
              Build a custom side-by-side
            </Link>
            <Link
              href="/services"
              className="font-heading text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-ink underline-offset-4 hover:text-signal hover:underline"
            >
              Need help launching it? →
            </Link>
          </div>
        </Container>
      </Section>

      {/* QUICK VERDICT */}
      <Section tone="paper" className="pt-2 pb-14 md:pt-4 md:pb-16">
        <Container>
          <VerdictBlock intro={page.intro} verdict={page.verdict} />
        </Container>
      </Section>

      {/* FEATURE TABLE */}
      <Section tone="deep" className="py-14 md:py-20">
        <Container>
          <div className="mb-6 grid gap-4 md:grid-cols-[5fr_7fr] md:items-end md:gap-12">
            <div>
              <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
                Feature table
              </p>
              <h2 className="mt-3 font-heading text-2xl font-bold text-ink md:text-3xl">
                Side by side, capability by capability.
              </h2>
            </div>
            <p className="text-sm text-ink-soft">
              Hidden columns? Scroll the table horizontally on mobile&hellip; we don&apos;t. We
              switch to stacked vendor cards instead, because squinting at a 9-column scroll-table
              on a phone isn&apos;t a buyer experience.
            </p>
          </div>
          <div className="hidden md:block">
            <ComparisonTable vendors={vendors} />
          </div>
          <div className="md:hidden">
            <ComparisonStackedCards vendors={vendors} />
          </div>
        </Container>
      </Section>

      {/* WHO EACH IS FOR — vendor profile cards with derived "Pick X if..." */}
      <Section tone="paper" className="py-14 md:py-20">
        <Container>
          <div className="mb-8 grid gap-4 md:grid-cols-[5fr_7fr] md:items-end md:gap-12">
            <div>
              <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
                Who each is for
              </p>
              <h2 className="mt-3 font-heading text-2xl font-bold text-ink md:text-3xl">
                The practical version of who picks what.
              </h2>
            </div>
            <p className="text-sm text-ink-soft">
              Each &ldquo;pick&rdquo; line is derived from actual differences in pricing, setup
              complexity, and capability — not generic descriptors.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {vendors.map((v, i) => {
              const other = vendors[1 - i];
              return (
                <VendorProfileCard
                  key={v.id}
                  vendor={v}
                  pickIf={other ? buildPickIf(v, other) : undefined}
                />
              );
            })}
          </div>
        </Container>
      </Section>

      {/* IMPLEMENTATION HELP */}
      <Section tone="paper" className="pt-0 pb-12 md:pb-16">
        <Container>
          <CtaBanner variant="setup" tone="ink" />
        </Container>
      </Section>

      {/* RELATED */}
      <Section tone="paper" className="border-t border-rule pt-14 pb-16 md:pt-16 md:pb-20">
        <Container>
          <RelatedBlock
            comparisons={relatedComparisons.map((c) => ({
              slug: c.slug,
              title: c.title,
              vendors: c.vendors.map((cv) => ({ name: cv.vendor.name })),
            }))}
            vendors={relatedVendors}
          />
        </Container>
      </Section>

      {/* FINAL CTA */}
      <Section tone="paper" className="pb-20">
        <Container>
          <CtaBanner variant="matched" tone="deep" />
        </Container>
      </Section>

      <JsonLd
        data={[
          comparisonJsonLd({
            title: page.title,
            slug: page.slug,
            vendors: vendors.map((v) => ({ name: v.name, slug: v.slug, description: v.summary })),
          }),
          breadcrumbJsonLd([
            { label: "Home", href: "/" },
            { label: "Compare", href: "/compare" },
            { label: page.title, href: `/compare/${page.slug}` },
          ]),
        ]}
      />
    </>
  );
}
