import Link from "next/link";

import { OutboundVendorCTA } from "@/components/vendors/outbound-vendor-cta";
import { VendorBadgeRow } from "@/components/vendors/vendor-badge-row";
import { formatPricing, formatScore, formatSetupComplexity } from "@/lib/scoring";

type Vendor = {
  slug: string;
  name: string;
  tagline: string | null;
  summary: string | null;
  bestFor: string | null;
  affiliateUrl: string | null;
  websiteUrl: string | null;
  pricingFromUsd: number | null;
  pricingModel: string | null;
  setupComplexity: number | null;
  overallScore: number | null;
  hasAppointmentBooking: boolean | null;
  hasCrmIntegration: boolean | null;
  hasHumanHandoff: boolean | null;
  hasMultilingual: boolean | null;
  has24x7: boolean | null;
  hipaaFriendly: boolean | null;
};

type VendorProfileCardProps = {
  vendor: Vendor;
  /** Optional editorial "pick this if you need…" copy, derived per page. */
  pickIf?: string;
};

/**
 * Used in the comparison detail page after the table — one card per
 * vendor with the practical summary, pricing, score, capability badges,
 * and the outbound vendor CTA + full-review link.
 */
export function VendorProfileCard({ vendor, pickIf }: VendorProfileCardProps) {
  return (
    <article className="flex h-full flex-col gap-5 rounded-[var(--radius-card)] border border-rule bg-surface p-6 shadow-[var(--shadow-card)] md:p-7">
      <header className="flex items-start justify-between gap-4 border-b border-rule pb-4">
        <div className="min-w-0">
          <h3 className="font-heading text-2xl font-bold text-ink">
            <Link href={`/vendors/${vendor.slug}`} className="hover:text-signal">
              {vendor.name}
            </Link>
          </h3>
          {vendor.tagline ? (
            <p className="mt-1 text-sm text-ink-soft">{vendor.tagline}</p>
          ) : null}
        </div>
        <div className="shrink-0 text-right">
          <p className="font-heading text-3xl font-bold leading-none tabular-nums text-ink">
            {formatScore(vendor.overallScore)}
          </p>
          <p className="mt-1 font-heading text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-ink">
            Editor score
          </p>
        </div>
      </header>

      {pickIf ? (
        <div className="rounded-[var(--radius-button)] bg-signal-soft/70 px-4 py-3 text-sm text-ink">
          <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.16em] text-signal">
            Pick {vendor.name} if ·
          </span>{" "}
          {pickIf}
        </div>
      ) : null}

      {vendor.summary ? (
        <p className="text-sm leading-relaxed text-ink-soft">{vendor.summary}</p>
      ) : null}

      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-rule pt-4 text-sm">
        <div>
          <dt className="font-heading text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-ink">
            Pricing
          </dt>
          <dd className="mt-1 text-ink-soft">
            {formatPricing(vendor.pricingFromUsd, vendor.pricingModel)}
          </dd>
        </div>
        <div>
          <dt className="font-heading text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-ink">
            Setup
          </dt>
          <dd className="mt-1 text-ink-soft">{formatSetupComplexity(vendor.setupComplexity)}</dd>
        </div>
      </dl>

      <VendorBadgeRow vendor={vendor} limit={6} />

      <div className="mt-auto flex flex-col gap-2 border-t border-rule pt-4">
        <OutboundVendorCTA vendor={vendor} variant="stacked" />
        <Link
          href={`/vendors/${vendor.slug}`}
          className="block text-center font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-ink underline-offset-4 hover:text-signal hover:underline"
        >
          Read the full {vendor.name} review →
        </Link>
      </div>
    </article>
  );
}
