import Link from "next/link";

import { cn } from "@/lib/utils";

type DisclosureProps = {
  /** Slug of the vendor (used for `?from=` tracking on link if you want). */
  vendorSlug?: string;
  /** Show the longer editorial copy or the inline one-liner. */
  variant?: "inline" | "panel";
  className?: string;
};

/**
 * Renders the short editorial disclosure shown next to outbound vendor
 * links when a referral relationship exists. Trust-first language: makes
 * clear that *rankings* are editorial, *clicks* may be monetized.
 */
export function Disclosure({ variant = "inline", className }: DisclosureProps) {
  if (variant === "panel") {
    return (
      <aside
        className={cn(
          "rounded-[var(--radius-card)] border border-rule bg-paper-deep/60 p-4 text-sm text-ink-soft",
          className,
        )}
      >
        <p className="font-heading text-[10px] font-semibold text-signal">
          Disclosure
        </p>
        <p className="mt-1.5 leading-relaxed">
          CallTreo may earn a referral fee from clicks on this vendor&apos;s outbound link. The
          editor&apos;s ranking is decided before any referral relationship exists and is not
          influenced by it.{" "}
          <Link
            href="/disclosure"
            className="font-medium text-ink underline-offset-4 hover:text-signal hover:underline"
          >
            Read our full disclosure
          </Link>
          .
        </p>
      </aside>
    );
  }

  return (
    <p
      className={cn(
        "text-[11px] leading-snug text-muted-ink",
        className,
      )}
    >
      <span className="font-heading font-semibold text-signal">
        Disclosure ·
      </span>{" "}
      We may earn a referral from this link.{" "}
      <Link
        href="/disclosure"
        className="underline-offset-4 hover:text-ink hover:underline"
      >
        How we stay editorial →
      </Link>
    </p>
  );
}

/**
 * A small inline badge for sponsored / featured listings. Distinct from
 * referral disclosure: this marks paid placement, not commission.
 */
export function SponsoredBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[var(--radius-button)] border border-signal/40 bg-signal-soft/60 px-2 py-0.5 font-heading text-[10px] font-semibold text-signal",
        className,
      )}
    >
      Sponsored
    </span>
  );
}
