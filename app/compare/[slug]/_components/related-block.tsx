import Link from "next/link";

import { formatScore } from "@/lib/scoring";

type RelatedComparison = {
  slug: string;
  title: string;
  vendors: ReadonlyArray<{ name: string }>;
};

type RelatedVendor = {
  slug: string;
  name: string;
  tagline: string | null;
  overallScore: number | null;
};

type RelatedBlockProps = {
  comparisons: ReadonlyArray<RelatedComparison>;
  vendors: ReadonlyArray<RelatedVendor>;
};

export function RelatedBlock({ comparisons, vendors }: RelatedBlockProps) {
  if (!comparisons.length && !vendors.length) return null;

  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-12">
      {comparisons.length ? (
        <div>
          <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
            Related comparisons
          </p>
          <h3 className="mt-2 font-heading text-xl font-bold text-ink">
            Other head-to-heads.
          </h3>
          <ul className="mt-4 divide-y divide-rule border-y border-rule">
            {comparisons.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/compare/${c.slug}`}
                  className="group flex items-baseline justify-between gap-4 py-4"
                >
                  <span>
                    <p className="font-heading text-base font-semibold text-ink group-hover:text-signal">
                      {c.title}
                    </p>
                    {c.vendors.length ? (
                      <p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted-ink">
                        {c.vendors.map((v) => v.name).join(" vs ")}
                      </p>
                    ) : null}
                  </span>
                  <span
                    aria-hidden
                    className="font-heading text-sm text-muted-ink group-hover:text-signal"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {vendors.length ? (
        <div>
          <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
            More vendors
          </p>
          <h3 className="mt-2 font-heading text-xl font-bold text-ink">
            Worth a look outside this comparison.
          </h3>
          <ul className="mt-4 divide-y divide-rule border-y border-rule">
            {vendors.map((v) => (
              <li key={v.slug}>
                <Link
                  href={`/vendors/${v.slug}`}
                  className="group flex items-baseline justify-between gap-4 py-4"
                >
                  <span>
                    <p className="font-heading text-base font-semibold text-ink group-hover:text-signal">
                      {v.name}
                    </p>
                    {v.tagline ? (
                      <p className="mt-1 text-xs text-muted-ink">{v.tagline}</p>
                    ) : null}
                  </span>
                  <span className="shrink-0 font-heading text-base font-bold tabular-nums text-muted-ink group-hover:text-signal">
                    {formatScore(v.overallScore)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
