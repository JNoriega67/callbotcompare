import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { JsonLd } from "@/components/marketing/json-ld";
import { VendorBadgeRow } from "@/components/vendors/vendor-badge-row";
import { Alternatives } from "@/app/vendors/[slug]/_components/alternatives";
import { ProsCons } from "@/app/vendors/[slug]/_components/pros-cons";
import { ScoreBreakdown } from "@/app/vendors/[slug]/_components/score-breakdown";
import { prisma } from "@/lib/db";
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
  if (!vendor) return buildMetadata({ title: "Vendor not found", description: "", path: `/vendors/${slug}`, noIndex: true });

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

  const outboundHref = vendor.affiliateUrl ?? vendor.websiteUrl;

  return (
    <>
      <Section tone="cream" className="pt-10 pb-8 md:pt-14 md:pb-10">
        <Container className="space-y-4">
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/" },
              { label: "Vendors", href: "/vendors" },
              { label: vendor.name, href: `/vendors/${vendor.slug}` },
            ]}
          />
          <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-start">
            <div className="space-y-4">
              <h1 className="font-heading text-3xl font-bold text-slate md:text-4xl">
                {vendor.name}
              </h1>
              {vendor.tagline ? <p className="text-lg text-charcoal/85">{vendor.tagline}</p> : null}
              {vendor.summary ? <p className="text-charcoal/80">{vendor.summary}</p> : null}
              <VendorBadgeRow vendor={vendor} limit={6} />
            </div>
            <aside className="rounded-card border border-border bg-surface p-5 shadow-[var(--shadow-card)]">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                    Editor score
                  </p>
                  <p className="font-heading text-3xl font-bold text-slate">
                    {formatScore(vendor.overallScore)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                    Pricing
                  </p>
                  <p className="font-medium text-charcoal">
                    {formatPricing(vendor.pricingFromUsd, vendor.pricingModel)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                    Setup
                  </p>
                  <p className="font-medium text-charcoal">
                    {formatSetupComplexity(vendor.setupComplexity)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                    HIPAA-friendly
                  </p>
                  <p className="font-medium text-charcoal">
                    {vendor.hipaaFriendly === true
                      ? "Yes"
                      : vendor.hipaaFriendly === false
                        ? "No"
                        : "—"}
                  </p>
                </div>
              </div>
              {outboundHref ? (
                <a
                  href={outboundHref}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="mt-5 block rounded-[var(--radius-button)] bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground transition-colors hover:bg-[color:var(--brand-teal-hover)]"
                  data-event="vendor_outbound"
                  data-slug={vendor.slug}
                >
                  Visit {vendor.name} ↗
                </a>
              ) : null}
              <Link
                href="/contact"
                className="mt-2 block rounded-[var(--radius-button)] border border-slate/20 px-4 py-2 text-center text-sm font-semibold text-slate hover:border-teal hover:text-teal"
              >
                Need help choosing?
              </Link>
            </aside>
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container className="space-y-12">
          <ProsCons vendor={vendor} />

          <div className="space-y-4">
            <h2 className="font-heading text-xl font-semibold text-slate">Scorecard</h2>
            <p className="text-sm text-muted">
              How we rank vendors. See the rubric at{" "}
              <Link href="/best-ai-receptionist-software" className="text-teal hover:underline">
                Best AI receptionist software
              </Link>
              .
            </p>
            <ScoreBreakdown vendor={vendor} />
          </div>

          {vendor.vendorFeatures.length ? (
            <div className="space-y-3">
              <h2 className="font-heading text-xl font-semibold text-slate">Features &amp; integrations</h2>
              <ul className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                {vendor.vendorFeatures.map((vf) => (
                  <li
                    key={vf.featureId}
                    className="flex items-center gap-2 rounded-[var(--radius-button)] border border-border bg-surface px-3 py-2 text-sm text-charcoal"
                  >
                    <span
                      aria-hidden
                      className="inline-block h-1.5 w-1.5 rounded-full bg-teal"
                    />
                    {vf.feature.name}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {vendor.vendorVerticals.length ? (
            <div className="space-y-3">
              <h2 className="font-heading text-xl font-semibold text-slate">Industries served</h2>
              <div className="flex flex-wrap gap-2">
                {vendor.vendorVerticals.map((vv) => (
                  <span
                    key={vv.verticalId}
                    className="rounded-full border border-border bg-sage px-3 py-1 text-xs font-medium text-slate"
                  >
                    {vv.vertical.name}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          <Alternatives items={alternatives} />
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
