import Link from "next/link";

import { formatScore } from "@/lib/scoring";

type Alternative = {
  slug: string;
  name: string;
  tagline: string | null;
  overallScore: number | null;
};

export function Alternatives({ items }: { items: Alternative[] }) {
  if (!items.length) return null;

  return (
    <div className="space-y-3">
      <h2 className="font-heading text-xl font-semibold text-ink">Alternatives to consider</h2>
      <div className="grid gap-3 md:grid-cols-3">
        {items.map((v) => (
          <Link
            key={v.slug}
            href={`/vendors/${v.slug}`}
            className="group rounded-[var(--radius-card)] border border-rule bg-surface p-4 transition-colors hover:border-teal"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-heading text-sm font-semibold text-ink group-hover:text-signal">
                {v.name}
              </h3>
              <span className="text-xs font-semibold text-muted">{formatScore(v.overallScore)}</span>
            </div>
            {v.tagline ? <p className="mt-1 text-xs text-muted">{v.tagline}</p> : null}
          </Link>
        ))}
      </div>
    </div>
  );
}
