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
    <article className="group relative flex h-full flex-col gap-4 rounded-[var(--radius-card)] border border-rule bg-surface p-6 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:border-signal/40 hover:shadow-[var(--shadow-card-hover)]">
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-heading text-xl font-bold leading-tight text-ink md:text-2xl">
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
          <p className="mt-1 font-heading text-[10px] font-semibold text-muted-ink">
            Score
          </p>
        </div>
      </header>
      {vendor.summary ? (
        <p className="text-sm leading-relaxed text-ink-soft">{vendor.summary}</p>
      ) : null}
      <VendorBadgeRow vendor={vendor} />
      <footer className="mt-auto flex items-center justify-between gap-3 border-t border-rule pt-3">
        <span className="font-heading text-[11px] font-semibold text-muted-ink">
          {formatPricing(vendor.pricingFromUsd, vendor.pricingModel)}
        </span>
        <Link
          href={`/vendors/${vendor.slug}`}
          className="font-heading text-[11px] font-semibold text-signal underline-offset-4 hover:underline"
        >
          Read review →
        </Link>
      </footer>
    </article>
  );
}
