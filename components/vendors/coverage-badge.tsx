/**
 * Visual signal that a vendor is listed in the directory but hasn't been
 * scored against the rubric yet. Rendered on cards + detail pages when
 * vendor.overallScore is null.
 *
 * The intent is "intentionally pending" — not "broken" or "incomplete."
 * Reads as editorial honesty rather than data missing.
 */

import Link from "next/link";

type Size = "sm" | "md";

const SIZE_CLASS: Record<Size, string> = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-2.5 py-1 text-[11px]",
};

export function CoverageBadge({ size = "sm" }: { size?: Size }) {
  return (
    <span
      className={
        "inline-flex items-center gap-1.5 rounded-full border border-[color:var(--warning)]/30 bg-[color:var(--warning)]/10 font-heading font-semibold text-[color:var(--warning)] " +
        SIZE_CLASS[size]
      }
      title="This vendor is listed but hasn't been scored against our published rubric yet."
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[color:var(--warning)]" />
      Coverage in progress
    </span>
  );
}

/**
 * Larger, paragraph-form variant rendered on the vendor detail page
 * above the scorecard when there's no score yet. Includes a link to the
 * methodology so the reader knows what's coming and why.
 */
export function CoverageNotice({ vendorName }: { vendorName: string }) {
  return (
    <aside
      className="rounded-[var(--radius-card)] border border-[color:var(--warning)]/30 bg-[color:var(--warning)]/10 p-4 md:p-5"
      role="note"
    >
      <p className="font-heading text-[11px] font-semibold text-[color:var(--warning)]">
        Coverage in progress
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
        {vendorName} is in the directory as an anchor entry. We haven&apos;t finished a
        full review against our{" "}
        <Link href="/methodology" className="font-medium text-ink underline underline-offset-2 hover:text-signal">
          published rubric
        </Link>
        , so capabilities, pricing, and the editor score are intentionally null rather
        than guessed. Until then, treat this page as a starting point — visit the
        vendor&apos;s site to confirm the details that matter for your use case.
      </p>
    </aside>
  );
}
