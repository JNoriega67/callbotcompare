import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * Mobile-only sticky bottom CTA bar. Designed for high-intent detail
 * pages (vendor, comparison) where the primary action would otherwise
 * scroll out of view on mobile.
 *
 * Desktop: hidden (md:hidden). Desktop has the inline CTAs.
 * Mobile: fixed to bottom of viewport, premium card-style bar with the
 * primary teal action and a secondary outline action.
 *
 * Add padding-bottom to your page (or to layout) to prevent the bar
 * from covering content above it on mobile.
 */

type StickyBottomCTAProps = {
  /** Primary action — usually the highest-intent next step. */
  primary: {
    href: string;
    label: string;
    /** Use rel='sponsored noopener nofollow' when the link is an outbound affiliate. */
    rel?: string;
    target?: string;
  };
  /** Optional secondary action — e.g. "Take the quiz" / "Compare". */
  secondary?: {
    href: string;
    label: string;
  };
  /** Optional context label rendered above the buttons (small text). */
  context?: string;
  className?: string;
};

export function StickyBottomCTA({ primary, secondary, context, className }: StickyBottomCTAProps) {
  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t border-rule bg-surface/95 px-4 py-3 shadow-[0_-4px_16px_rgba(47,79,112,0.08)] backdrop-blur-md md:hidden",
        className,
      )}
    >
      {context ? (
        <p className="mb-2 text-center font-heading text-[10px] font-semibold text-muted-ink">
          {context}
        </p>
      ) : null}
      <div className="flex items-stretch gap-2">
        <Link
          href={primary.href}
          rel={primary.rel}
          target={primary.target}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-[var(--radius-button)] bg-signal px-4 py-3 font-heading text-[12px] font-semibold text-signal-ink transition-colors hover:bg-signal-hover"
        >
          {primary.label}
          <span aria-hidden>→</span>
        </Link>
        {secondary ? (
          <Link
            href={secondary.href}
            className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] border border-ink/20 bg-surface px-4 py-3 font-heading text-[12px] font-semibold text-ink transition-colors hover:border-signal hover:text-signal"
          >
            {secondary.label}
          </Link>
        ) : null}
      </div>
    </div>
  );
}
