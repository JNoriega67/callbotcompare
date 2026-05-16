import Link from "next/link";

import { formatPricing, formatScore } from "@/lib/scoring";

type Vendor = {
  slug: string;
  name: string;
  bestFor: string | null;
  pricingFromUsd: number | null;
  pricingModel: string | null;
  overallScore: number | null;
  hasAppointmentBooking: boolean | null;
  hasCrmIntegration: boolean | null;
  hasHumanHandoff: boolean | null;
  has24x7: boolean | null;
};

/**
 * Mobile presentation of the comparison table: one card per vendor,
 * key fields as labeled rows. Per docs/MOBILE_LAYOUT_SPEC.md — NO
 * horizontal-scroll table on mobile.
 */
export function ComparisonStackedCards({ vendors }: { vendors: Vendor[] }) {
  if (!vendors.length) return null;

  return (
    <div className="space-y-4">
      {vendors.map((v) => (
        <article
          key={v.slug}
          className="rounded-card border border-border bg-surface p-5 shadow-[var(--shadow-card)]"
        >
          <header className="flex items-start justify-between gap-3">
            <Link
              href={`/vendors/${v.slug}`}
              className="font-heading text-lg font-semibold text-slate hover:text-teal"
            >
              {v.name}
            </Link>
            <span className="font-heading text-xl font-bold text-slate">
              {formatScore(v.overallScore)}
            </span>
          </header>
          {v.bestFor ? <p className="mt-2 text-sm text-charcoal/85">{v.bestFor}</p> : null}
          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
            <Row label="Pricing" value={formatPricing(v.pricingFromUsd, v.pricingModel)} />
            <Row label="Booking" value={fmtBool(v.hasAppointmentBooking)} />
            <Row label="CRM" value={fmtBool(v.hasCrmIntegration)} />
            <Row label="Handoff" value={fmtBool(v.hasHumanHandoff)} />
            <Row label="24/7" value={fmtBool(v.has24x7)} />
          </dl>
          <Link
            href={`/vendors/${v.slug}`}
            className="mt-5 inline-block rounded-[var(--radius-button)] border border-slate/25 px-3 py-1.5 text-xs font-semibold text-slate hover:border-teal hover:text-teal"
          >
            View details →
          </Link>
        </article>
      ))}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <>
      <dt className="font-medium uppercase tracking-wide text-muted">{label}</dt>
      <dd className="text-charcoal">{value}</dd>
    </>
  );
}

function fmtBool(value: boolean | null): string {
  if (value === true) return "Yes";
  if (value === false) return "No";
  return "—";
}
