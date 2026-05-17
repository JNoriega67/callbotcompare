import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { Disclosure } from "@/components/marketing/disclosure";
import { EditorialMeta } from "@/components/marketing/editorial-meta";
import { JsonLd } from "@/components/marketing/json-ld";
import { OutboundVendorCTA } from "@/components/vendors/outbound-vendor-cta";
import { VendorBadgeRow } from "@/components/vendors/vendor-badge-row";
import { Alternatives } from "@/app/vendors/[slug]/_components/alternatives";
import { ProsCons } from "@/app/vendors/[slug]/_components/pros-cons";
import { ScoreBreakdown } from "@/app/vendors/[slug]/_components/score-breakdown";
import { prisma } from "@/lib/db";
import { relatedGuidesForVendor } from "@/lib/related-for-vendor";
import { formatPricing, formatScore, formatSetupComplexity } from "@/lib/scoring";
import { buildMetadata, breadcrumbJsonLd, vendorJsonLd } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

type Params = Promise<{ slug: string }>;

async function loadVendor(slug: string) {
  return prisma.vendor.findFirst({
    where: { slug, isPublished: true },
    include: {
      vendorVerticals: { include: { vertical: true } },
      vendorFeatures: { include: { feature: true } },
    },
  });
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const vendor = await loadVendor(slug);
  if (!vendor)
    return buildMetadata({
      title: "Vendor not found",
      description: "",
      path: `/vendors/${slug}`,
      noIndex: true,
    });

  return buildMetadata({
    title: `${vendor.name} review and scorecard`,
    description:
      vendor.tagline ??
      vendor.summary ??
      `Independent review of ${vendor.name}: features, pricing, integrations, and where it fits.`,
    path: `/vendors/${slug}`,
  });
}

export default async function VendorDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const vendor = await loadVendor(slug);
  if (!vendor) notFound();

  const alternatives = await prisma.vendor.findMany({
    where: { isPublished: true, NOT: { slug: vendor.slug } },
    orderBy: [{ overallScore: { sort: "desc", nulls: "last" } }, { name: "asc" }],
    take: 3,
    select: { slug: true, name: true, tagline: true, overallScore: true },
  });

  const hasOutbound = Boolean(vendor.affiliateUrl ?? vendor.websiteUrl);
  const isReferral = Boolean(vendor.affiliateUrl);

  const relatedGuides = relatedGuidesForVendor({
    verticalSlugs: vendor.vendorVerticals.map((vv) => vv.vertical.slug),
    hasCrmIntegration: vendor.hasCrmIntegration,
    hasAppointmentBooking: vendor.hasAppointmentBooking,
    hipaaFriendly: vendor.hipaaFriendly,
  });

  return (
    <>
      {/* ABOVE-THE-FOLD */}
      <Section tone="paper" className="pt-10 pb-10 md:pt-14 md:pb-12">
        <Container className="space-y-6">
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/" },
              { label: "Vendors", href: "/vendors" },
              { label: vendor.name, href: `/vendors/${vendor.slug}` },
            ]}
          />
          <div className="grid gap-10 md:grid-cols-[1.5fr_1fr] md:items-start">
            <div className="space-y-5">
              <div>
                <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
                  Vendor review
                </p>
                <h1 className="mt-3 font-heading text-3xl font-bold text-ink md:text-5xl">
                  {vendor.name}
                </h1>
                <div className="mt-4">
                  <EditorialMeta
                    updated={vendor.updatedAt}
                    sourcingLabel="Scoring rubric"
                    reviewCadence="Reviewed quarterly"
                  />
                </div>
              </div>
              {vendor.tagline ? (
                <p className="text-lg leading-relaxed text-ink-soft md:text-xl">
                  {vendor.tagline}
                </p>
              ) : null}
              {vendor.summary ? <p className="text-ink-soft">{vendor.summary}</p> : null}
              <VendorBadgeRow vendor={vendor} limit={6} />
            </div>

            {/* Sticky sidebar — scorecard + primary CTAs */}
            <aside className="rounded-[var(--radius-card)] border border-rule bg-surface p-5 shadow-[var(--shadow-card)] md:sticky md:top-24">
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="font-heading text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-ink">
                    Editor score
                  </dt>
                  <dd className="mt-1 font-heading text-4xl font-bold leading-none tabular-nums text-ink">
                    {formatScore(vendor.overallScore)}
                  </dd>
                </div>
                <div>
                  <dt className="font-heading text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-ink">
                    Pricing
                  </dt>
                  <dd className="mt-1 font-heading text-base font-semibold text-ink">
                    {formatPricing(vendor.pricingFromUsd, vendor.pricingModel)}
                  </dd>
                </div>
                <div>
                  <dt className="font-heading text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-ink">
                    Setup
                  </dt>
                  <dd className="mt-1 text-ink-soft">
                    {formatSetupComplexity(vendor.setupComplexity)}
                  </dd>
                </div>
                <div>
                  <dt className="font-heading text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-ink">
                    HIPAA-friendly
                  </dt>
                  <dd className="mt-1 text-ink-soft">
                    {vendor.hipaaFriendly === true
                      ? "Yes"
                      : vendor.hipaaFriendly === false
                        ? "No"
                        : "—"}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 space-y-3">
                {hasOutbound ? (
                  <OutboundVendorCTA vendor={vendor} variant="stacked" />
                ) : null}

                <Link
                  href="/quiz"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius-button)] border border-ink/15 bg-surface px-4 py-2.5 font-heading text-[12px] font-semibold uppercase tracking-[0.1em] text-ink transition-colors hover:border-signal hover:text-signal"
                >
                  Get matched in 5 questions
                </Link>
                <Link
                  href="/contact"
                  className="block text-center font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-ink underline-offset-4 hover:text-signal hover:underline"
                >
                  Need help choosing?
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* BODY */}
      <Section tone="paper" className="pt-0 pb-16 md:pb-20">
        <Container className="space-y-14">
          <ProsCons vendor={vendor} />

          {/* Mid-page conversion: get matched. Trust-first framing. */}
          <CtaBanner variant="matched" tone="deep" />

          <div className="grid gap-4 md:grid-cols-[5fr_7fr] md:gap-12">
            <div>
              <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
                Scorecard
              </p>
              <h2 className="mt-3 font-heading text-2xl font-bold text-ink md:text-3xl">
                How {vendor.name} scores across the nine dimensions.
              </h2>
              <p className="mt-4 text-sm text-ink-soft">
                Each dimension is rated 0–10 against our published rubric. The overall score
                weights them per{" "}
                <Link
                  href="/best-ai-receptionist-software"
                  className="text-ink underline underline-offset-4 hover:text-signal"
                >
                  our methodology
                </Link>
                .
              </p>
            </div>
            <ScoreBreakdown vendor={vendor} />
          </div>

          {vendor.vendorFeatures.length ? (
            <div className="grid gap-4 md:grid-cols-[5fr_7fr] md:gap-12">
              <div>
                <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
                  Features &amp; integrations
                </p>
                <h2 className="mt-3 font-heading text-2xl font-bold text-ink md:text-3xl">
                  What ships in the box.
                </h2>
                <p className="mt-4 text-sm text-ink-soft">
                  Capabilities CallTreo has verified for {vendor.name}. Fields we haven&apos;t
                  confirmed are intentionally omitted rather than guessed.
                </p>
              </div>
              <ul className="grid gap-2 sm:grid-cols-2">
                {vendor.vendorFeatures.map((vf) => (
                  <li
                    key={vf.featureId}
                    className="flex items-center gap-2 rounded-[var(--radius-button)] border border-rule bg-surface px-3 py-2 text-sm text-ink-soft"
                  >
                    <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-signal" />
                    {vf.feature.name}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {vendor.vendorVerticals.length ? (
            <div className="grid gap-4 md:grid-cols-[5fr_7fr] md:gap-12">
              <div>
                <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
                  Industries served
                </p>
                <h2 className="mt-3 font-heading text-2xl font-bold text-ink md:text-3xl">
                  Where {vendor.name} shows up most.
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {vendor.vendorVerticals.map((vv) => (
                  <span
                    key={vv.verticalId}
                    className="rounded-[var(--radius-button)] border border-rule bg-paper-deep/60 px-3 py-1.5 font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft"
                  >
                    {vv.vertical.name}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          <div className="grid gap-4 md:grid-cols-[5fr_7fr] md:gap-12">
            <div>
              <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
                Alternatives
              </p>
              <h2 className="mt-3 font-heading text-2xl font-bold text-ink md:text-3xl">
                Don&apos;t commit yet — compare against the next best fits.
              </h2>
              <Link
                href={`/compare?vendors=${vendor.slug}`}
                className="mt-4 inline-flex items-center gap-2 font-heading text-[12px] font-semibold uppercase tracking-[0.12em] text-ink underline-offset-4 hover:text-signal hover:underline"
              >
                Build a side-by-side with {vendor.name}
                <span aria-hidden>→</span>
              </Link>
            </div>
            <Alternatives items={alternatives} />
          </div>

          {/* Related editorial guides (cross-cluster internal linking) */}
          {relatedGuides.length ? (
            <div>
              <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
                Related guides
              </p>
              <h2 className="mt-3 font-heading text-2xl font-bold text-ink md:text-3xl">
                Buyer guides aligned with {vendor.name}&apos;s fit.
              </h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {relatedGuides.map((g) => (
                  <li key={g.href}>
                    <Link
                      href={g.href}
                      className="group flex h-full flex-col justify-between rounded-[var(--radius-card)] border border-rule bg-surface p-4 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)]"
                    >
                      <div>
                        <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-ink">
                          {g.eyebrow}
                        </p>
                        <p className="mt-2 font-heading text-base font-semibold text-ink group-hover:text-signal">
                          {g.title}
                        </p>
                      </div>
                      <p className="mt-3 font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-signal group-hover:underline">
                        Read the guide →
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* Implementation help CTA */}
          <CtaBanner variant="setup" tone="ink" />

          {/* Persistent disclosure when monetized */}
          {isReferral ? <Disclosure variant="panel" vendorSlug={vendor.slug} /> : null}
        </Container>
      </Section>

      <JsonLd
        data={[
          vendorJsonLd({
            name: vendor.name,
            slug: vendor.slug,
            description: vendor.summary,
            websiteUrl: vendor.websiteUrl,
            overallScore: vendor.overallScore,
          }),
          breadcrumbJsonLd([
            { label: "Home", href: "/" },
            { label: "Vendors", href: "/vendors" },
            { label: vendor.name, href: `/vendors/${vendor.slug}` },
          ]),
        ]}
      />
    </>
  );
}
