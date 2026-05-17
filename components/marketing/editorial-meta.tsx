import Link from "next/link";

import { EDITORIAL_TEAM } from "@/lib/constants";

/**
 * Slim editorial credibility line: "Updated [date] · By [byline] · [Methodology]".
 * Designed to sit directly below a page H1 — reads as "this is maintained,
 * not a one-shot brochure" in one glance. Keep it short and unobtrusive.
 */

type EditorialMetaProps = {
  /**
   * Date the page content was last reviewed.
   * Accepts:
   *   - A Date object (used as-is)
   *   - An ISO date string ("2026-05-17")
   *   - A year-month string ("2026-05") which renders as "May 2026"
   */
  updated: Date | string;
  /** Defaults to EDITORIAL_TEAM. Pass to override. */
  byline?: string;
  /** Optional sourcing/methodology link text. */
  sourcingLabel?: string;
  /** Optional sourcing href. Defaults to /methodology if sourcingLabel is set. */
  sourcingHref?: string;
  /** Optional "Reviewed quarterly" or similar cadence statement. */
  reviewCadence?: string;
  /** Visual variant — affects color contrast on darker surfaces. */
  variant?: "light" | "dark";
  className?: string;
};

function formatUpdated(updated: Date | string): string {
  if (updated instanceof Date) {
    return updated.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  // Year-month shorthand: "2026-05" → "May 2026"
  if (/^\d{4}-\d{2}$/.test(updated)) {
    const [year, monthIdx] = updated.split("-");
    const date = new Date(Number(year), Number(monthIdx) - 1, 1);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  }
  // Full ISO date string: parse and render with day.
  const parsed = new Date(updated);
  if (Number.isNaN(parsed.getTime())) return updated;
  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function EditorialMeta({
  updated,
  byline = EDITORIAL_TEAM,
  sourcingLabel = "Methodology",
  sourcingHref = "/methodology",
  reviewCadence,
  variant = "light",
  className,
}: EditorialMetaProps) {
  const updatedStr = formatUpdated(updated);
  const isDark = variant === "dark";

  const baseClass = isDark ? "text-paper/70" : "text-muted-ink";
  const accentClass = isDark ? "text-paper" : "text-ink";
  const linkClass = isDark
    ? "text-paper underline-offset-4 hover:text-signal-soft hover:underline"
    : "text-ink underline-offset-4 hover:text-signal hover:underline";

  return (
    <div
      className={
        "flex flex-wrap items-center gap-x-3 gap-y-1 font-heading text-[11px] font-semibold uppercase tracking-[0.14em] " +
        baseClass +
        (className ? " " + className : "")
      }
    >
      <span>
        Updated <span className={accentClass}>{updatedStr}</span>
      </span>
      <span aria-hidden>·</span>
      <span>
        By <span className={accentClass}>{byline}</span>
      </span>
      {sourcingLabel ? (
        <>
          <span aria-hidden>·</span>
          <Link href={sourcingHref} className={linkClass}>
            {sourcingLabel} →
          </Link>
        </>
      ) : null}
      {reviewCadence ? (
        <>
          <span aria-hidden>·</span>
          <span>{reviewCadence}</span>
        </>
      ) : null}
    </div>
  );
}
