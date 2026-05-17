import { Disclosure } from "@/components/marketing/disclosure";
import { cn } from "@/lib/utils";

type OutboundVendorCTAProps = {
  vendor: {
    slug: string;
    name: string;
    affiliateUrl: string | null;
    websiteUrl: string | null;
  };
  /** Layout variant. "stacked" for sidebar, "row" for inline. */
  variant?: "stacked" | "row";
  className?: string;
};

/**
 * Single source of truth for "Visit vendor" buttons.
 *  - Prefers affiliateUrl if present, falls back to websiteUrl.
 *  - rel="sponsored noopener noreferrer nofollow" on monetized links
 *    (Google requires `sponsored`); plain `noopener noreferrer` otherwise.
 *  - Shows a one-line disclosure beneath the button when affiliateUrl is set.
 *  - Adds `data-event` for analytics tracking on click.
 *
 * If neither URL is set the component renders nothing — vendor pages
 * still need a "Need help choosing?" fallback CTA in the template.
 */
export function OutboundVendorCTA({
  vendor,
  variant = "stacked",
  className,
}: OutboundVendorCTAProps) {
  const href = vendor.affiliateUrl ?? vendor.websiteUrl;
  if (!href) return null;

  const isReferral = Boolean(vendor.affiliateUrl);
  const rel = isReferral
    ? "sponsored noopener noreferrer nofollow"
    : "noopener noreferrer";

  return (
    <div className={cn(variant === "stacked" ? "space-y-2" : "flex items-center gap-3", className)}>
      <a
        href={href}
        target="_blank"
        rel={rel}
        data-event="vendor_outbound"
        data-slug={vendor.slug}
        data-referral={isReferral ? "true" : "false"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-signal px-5 py-3 font-heading text-[13px] font-semibold uppercase tracking-[0.08em] text-signal-ink transition-colors hover:bg-signal-hover"
      >
        Visit {vendor.name}
        <span aria-hidden>↗</span>
      </a>
      {isReferral ? <Disclosure variant="inline" vendorSlug={vendor.slug} /> : null}
    </div>
  );
}
