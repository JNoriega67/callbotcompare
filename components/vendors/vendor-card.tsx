import Link from "next/link";

import { VendorBadgeRow } from "@/components/vendors/vendor-badge-row";
import { formatPricing, formatScore } from "@/lib/scoring";

type VendorCardProps = {
  vendor: {
    slug: string;
    name: string;
    tagline: string | null;
    summary: string | null;
    pricingFromUsd: number | null;
    pricingModel: string | null;
    overallScore: number | null;
    hasAppointmentBooking: boolean | null;
    hasCrmIntegration: boolean | null;
    hasHumanHandoff: boolean | null;
    hasMultilingual: boolean | null;
    has24x7: boolean | null;
    hipaaFriendly: boolean | null;
  };
};

export function VendorCard({ vendor }: VendorCardProps) {
  return (
    <article className="flex h-full flex-col gap-4 rounded-card border border-border bg-surface p-6 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)]">
      <header className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-heading text-lg font-semibold text-slate">
            <Link href={`/vendors/${vendor.slug}`} className="hover:text-teal">
              {vendor.name}
            </Link>
          </h3>
          {vendor.tagline ? (
            <p className="mt-1 text-sm text-muted">{vendor.tagline}</p>
          ) : null}
        </div>
        <div className="shrink-0 text-right">
          <div className="font-heading text-xl font-bold text-slate">
            {formatScore(vendor.overallScore)}
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted">
            Score
          </div>
        </div>
      </header>
      {vendor.summary ? (
        <p className="text-sm text-charcoal/85">{vendor.summary}</p>
      ) : null}
      <VendorBadgeRow vendor={vendor} />
      <footer className="mt-auto flex items-center justify-between gap-3 pt-2">
        <div className="text-sm">
          <span className="text-muted">Pricing</span>{" "}
          <span className="font-medium text-charcoal">
            {formatPricing(vendor.pricingFromUsd, vendor.pricingModel)}
          </span>
        </div>
        <Link
          href={`/vendors/${vendor.slug}`}
          className="rounded-[var(--radius-button)] border border-slate/20 px-3 py-1.5 text-xs font-semibold text-slate transition-colors hover:border-teal hover:text-teal"
        >
          View details →
        </Link>
      </footer>
    </article>
  );
}
