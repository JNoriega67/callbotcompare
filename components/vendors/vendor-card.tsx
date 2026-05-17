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
    <article className="group flex h-full flex-col gap-4 border-t-2 border-ink bg-surface p-5 transition-colors hover:bg-paper-deep">
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-2xl leading-tight">
            <Link href={`/vendors/${vendor.slug}`} className="text-ink hover:text-signal">
              {vendor.name}
            </Link>
          </h3>
          {vendor.tagline ? (
            <p className="mt-1 text-sm text-ink-soft">{vendor.tagline}</p>
          ) : null}
        </div>
        <div className="shrink-0 text-right">
          <p className="font-display text-3xl font-medium leading-none">
            {formatScore(vendor.overallScore)}
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-ink">Score</p>
        </div>
      </header>
      {vendor.summary ? (
        <p className="text-sm leading-relaxed text-ink-soft">{vendor.summary}</p>
      ) : null}
      <VendorBadgeRow vendor={vendor} />
      <footer className="mt-auto flex items-center justify-between gap-3 border-t border-rule pt-3 text-xs uppercase tracking-[0.14em]">
        <span className="text-muted-ink">
          {formatPricing(vendor.pricingFromUsd, vendor.pricingModel)}
        </span>
        <Link
          href={`/vendors/${vendor.slug}`}
          className="font-semibold text-ink underline-offset-4 hover:text-signal hover:underline"
        >
          View details →
        </Link>
      </footer>
    </article>
  );
}
