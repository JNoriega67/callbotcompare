import Link from "next/link";

import { formatPricing, formatScore } from "@/lib/scoring";
import { cn } from "@/lib/utils";

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

type ComparisonTableProps = {
  vendors: Vendor[];
  className?: string;
};

/**
 * 9-column comparison table (desktop). Pair with <ComparisonStackedCards />
 * via `hidden md:block` / `md:hidden` — mobile must NOT use horizontal scroll.
 */
export function ComparisonTable({ vendors, className }: ComparisonTableProps) {
  if (!vendors.length) return null;

  return (
    <div className={cn("overflow-hidden rounded-[var(--radius-card)] border border-rule bg-surface", className)}>
      <table className="w-full text-sm">
        <thead className="sticky top-0 bg-paper-deep font-heading text-[10px] text-muted-ink">
          <tr>
            <th scope="col" className="px-4 py-3 text-left font-semibold">Vendor</th>
            <th scope="col" className="px-4 py-3 text-left font-semibold">Best for</th>
            <th scope="col" className="px-4 py-3 text-left font-semibold">Pricing</th>
            <th scope="col" className="px-3 py-3 text-center font-semibold">Booking</th>
            <th scope="col" className="px-3 py-3 text-center font-semibold">CRM</th>
            <th scope="col" className="px-3 py-3 text-center font-semibold">Handoff</th>
            <th scope="col" className="px-3 py-3 text-center font-semibold">24/7</th>
            <th scope="col" className="px-3 py-3 text-center font-semibold">Score</th>
            <th scope="col" className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-rule">
          {vendors.map((v) => (
            <tr key={v.slug} className="transition-colors hover:bg-paper-deep/40">
              <th scope="row" className="px-4 py-4 text-left align-top">
                <Link
                  href={`/vendors/${v.slug}`}
                  className="font-heading text-base font-bold text-ink hover:text-signal"
                >
                  {v.name}
                </Link>
              </th>
              <td className="px-4 py-4 align-top text-ink-soft">{v.bestFor ?? "—"}</td>
              <td className="px-4 py-4 align-top text-ink-soft">
                {formatPricing(v.pricingFromUsd, v.pricingModel)}
              </td>
              <BoolCell value={v.hasAppointmentBooking} />
              <BoolCell value={v.hasCrmIntegration} />
              <BoolCell value={v.hasHumanHandoff} />
              <BoolCell value={v.has24x7} />
              <td className="px-3 py-4 text-center align-top font-heading text-lg font-bold tabular-nums text-ink">
                {formatScore(v.overallScore)}
              </td>
              <td className="px-4 py-4 align-top text-right">
                <Link
                  href={`/vendors/${v.slug}`}
                  className="inline-block rounded-[var(--radius-button)] border border-ink/15 px-3 py-1.5 font-heading text-[11px] font-semibold text-ink hover:border-signal hover:text-signal"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BoolCell({ value }: { value: boolean | null }) {
  const label = value === true ? "Yes" : value === false ? "No" : "Unknown";
  const symbol = value === true ? "✓" : value === false ? "✕" : "—";
  const tone =
    value === true
      ? "bg-signal-soft text-signal"
      : value === false
        ? "bg-paper-deep text-muted-ink"
        : "text-muted-ink/60";
  return (
    <td className="px-3 py-4 text-center align-top" aria-label={label}>
      <span
        className={cn(
          "inline-flex h-6 min-w-6 items-center justify-center rounded-full px-2 font-heading text-xs font-bold",
          tone,
        )}
      >
        {symbol}
      </span>
    </td>
  );
}
