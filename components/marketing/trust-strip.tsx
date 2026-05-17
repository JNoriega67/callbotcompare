import Link from "next/link";

/**
 * Slim horizontal band of editorial trust signals. Designed to sit
 * directly below or inside a hero on top-level pages — it reads as
 * "this is a serious resource, here's why" in one glance.
 *
 * Keep the items short (≤30 chars). The component scales 2–4 items.
 *
 * Markup note: this used to be <dl>/<dt>/<dd>, but a11y tooling rejects
 * <dt>/<dd> nested inside <a> (axe-core dlitem rule). We use a plain
 * stat-tile <div> grid with semantic labels via aria-label on the link.
 */

export type TrustStripItem = {
  label: string;
  value: string;
  /** Optional href turns the item into a link. */
  href?: string;
};

type TrustStripProps = {
  items: ReadonlyArray<TrustStripItem>;
  /** "light" for paper backgrounds, "dark" for ink backgrounds. */
  variant?: "light" | "dark";
  className?: string;
};

export function TrustStrip({ items, variant = "light", className }: TrustStripProps) {
  const isDark = variant === "dark";

  const labelClass = isDark
    ? "text-paper"
    : "text-muted-ink";
  const valueClass = isDark ? "text-paper" : "text-ink";
  const dividerClass = isDark ? "border-paper/15" : "border-rule";
  const linkClass = isDark
    ? "hover:text-signal-soft"
    : "hover:text-signal";

  return (
    <div
      role="list"
      className={
        "grid w-full divide-y md:divide-y-0 " +
        (items.length === 2
          ? "md:grid-cols-2 md:divide-x "
          : items.length === 3
            ? "md:grid-cols-3 md:divide-x "
            : "md:grid-cols-4 md:divide-x ") +
        dividerClass +
        " " +
        (className ?? "")
      }
    >
      {items.map((item) => {
        const inner = (
          <>
            <p
              className={
                "font-heading text-[10px] font-semibold uppercase tracking-[0.18em] " + labelClass
              }
            >
              {item.label}
            </p>
            <p
              className={
                "mt-2 font-heading text-2xl font-bold leading-none tabular-nums md:text-3xl " +
                valueClass
              }
            >
              {item.value}
            </p>
          </>
        );
        const wrapperClass = "px-2 py-5 md:px-6 md:py-6";
        return (
          <div key={item.label} role="listitem">
            {item.href ? (
              <Link
                href={item.href}
                aria-label={`${item.label}: ${item.value}`}
                className={
                  wrapperClass + " group block transition-colors " + linkClass
                }
              >
                {inner}
                <span
                  aria-hidden
                  className={
                    "mt-2 inline-block font-heading text-[10px] font-semibold uppercase tracking-[0.14em] underline-offset-4 group-hover:underline " +
                    (isDark ? "text-signal-soft" : "text-signal")
                  }
                >
                  View →
                </span>
              </Link>
            ) : (
              <div className={wrapperClass}>{inner}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
