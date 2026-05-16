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
 * 9-column comparison table per docs/COMPONENT_UI_SPEC.md.
 * Desktop only — pair with <ComparisonStackedCards /> using `hidden md:block`
 * / `md:hidden` because mobile must NOT use horizontal scroll
 * (see docs/MOBILE_LAYOUT_SPEC.md).
 */
export function ComparisonTable({ vendors, className }: ComparisonTableProps) {
  if (!vendors.length) return null;

  return (
    <div className={cn("overflow-hidden rounded-card border border-border bg-surface", className)}>
      <table className="w-full text-sm">
        <thead className="sticky top-0 bg-sage/80 text-left text-xs font-semibold uppercase tracking-wide text-slate">
          <tr>
            <th scope="col" className="px-4 py-3">Vendor</th>
            <th scope="col" className="px-4 py-3">Best for</th>
            <th scope="col" className="px-4 py-3">Pricing</th>
            <th scope="col" className="px-3 py-3 text-center">Booking</th>
            <th scope="col" className="px-3 py-3 text-center">CRM</th>
            <th scope="col" className="px-3 py-3 text-center">Handoff</th>
            <th scope="col" className="px-3 py-3 text-center">24/7</th>
            <th scope="col" className="px-3 py-3 text-center">Score</th>
            <th scope="col" className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {vendors.map((v, i) => (
            <tr key={v.slug} className={cn(i % 2 === 1 && "bg-cream/40")}>
              <th scope="row" className="px-4 py-4 text-left align-top">
                <Link
                  href={`/vendors/${v.slug}`}
                  className="font-heading font-semibold text-slate hover:text-teal"
                >
                  {v.name}
                </Link>
              </th>
              <td className="px-4 py-4 align-top text-charcoal/85">{v.bestFor ?? "—"}</td>
              <td className="px-4 py-4 align-top text-charcoal/85">
                {formatPricing(v.pricingFromUsd, v.pricingModel)}
              </td>
              <BoolCell value={v.hasAppointmentBooking} />
              <BoolCell value={v.hasCrmIntegration} />
              <BoolCell value={v.hasHumanHandoff} />
              <BoolCell value={v.has24x7} />
              <td className="px-3 py-4 text-center align-top font-heading font-bold text-slate">
                {formatScore(v.overallScore)}
              </td>
              <td className="px-4 py-4 align-top text-right">
                <Link
                  href={`/vendors/${v.slug}`}
                  className="inline-block rounded-[var(--radius-button)] border border-slate/25 px-3 py-1.5 text-xs font-semibold text-slate hover:border-teal hover:text-teal"
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
  const symbol = value === true ? "●" : value === false ? "○" : "—";
  const tone =
    value === true ? "text-success" : value === false ? "text-muted" : "text-muted/60";
  return (
    <td className={cn("px-3 py-4 text-center align-top font-semibold", tone)} aria-label={value === true ? "Yes" : value === false ? "No" : "Unknown"}>
      {symbol}
    </td>
  );
}
