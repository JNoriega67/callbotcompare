"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useTransition } from "react";

import {
  CAPABILITIES,
  type Capability,
  type FilterParams,
  SORT_OPTIONS,
  type SortKey,
  hasActiveFilters,
  parseFilters,
  toSearchParams,
} from "@/lib/filters";

type Option = { slug: string; name: string };

type DirectoryControlsProps = {
  verticals: Option[];
  features: Option[];
  resultCount: number;
};

/**
 * Top-of-page controls for the vendors directory:
 *  - prominent search input
 *  - active filter chips (clickable X to remove each filter)
 *  - sort dropdown on the right
 *
 * Single client component so all three share one URL-state mutator.
 * The sidebar/sheet still owns the long checkbox lists for verticals,
 * features, and capabilities.
 */
export function DirectoryControls({
  verticals,
  features,
  resultCount,
}: DirectoryControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const [pending, startTransition] = useTransition();

  const filters = useMemo<FilterParams>(() => parseFilters(sp), [sp]);

  const update = useCallback(
    (next: FilterParams) => {
      const qs = toSearchParams(next);
      startTransition(() => {
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      });
    },
    [router, pathname],
  );

  const setQuery = (q: string) => update({ ...filters, q: q.trim() || undefined });
  const setSort = (sort: SortKey) => update({ ...filters, sort });

  const removeVertical = (slug: string) =>
    update({ ...filters, verticals: filters.verticals.filter((s) => s !== slug) });
  const removeFeature = (slug: string) =>
    update({ ...filters, features: filters.features.filter((s) => s !== slug) });
  const removeCapability = (cap: Capability) =>
    update({ ...filters, capabilities: filters.capabilities.filter((c) => c !== cap) });

  const verticalsBySlug = useMemo(
    () => new Map(verticals.map((v) => [v.slug, v.name])),
    [verticals],
  );
  const featuresBySlug = useMemo(() => new Map(features.map((f) => [f.slug, f.name])), [features]);
  const capabilityLabel = (cap: Capability) =>
    CAPABILITIES.find((c) => c.value === cap)?.label ?? cap;

  const active = hasActiveFilters(filters);

  return (
    <div className="space-y-6">
      {/* Search + sort */}
      <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end md:gap-6">
        <label className="block">
          <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
            Search the directory
          </span>
          <div className="mt-2 flex items-center gap-3 rounded-[var(--radius-input)] border border-rule bg-surface px-4 py-3 focus-within:border-signal focus-within:ring-3 focus-within:ring-ring/30">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 shrink-0 text-muted-ink"
              aria-hidden
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.5" y2="16.5" />
            </svg>
            <input
              type="search"
              inputMode="search"
              placeholder="Vendor name, capability, or industry…"
              defaultValue={filters.q ?? ""}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full border-0 bg-transparent text-base text-ink placeholder:text-muted-ink/70 focus:outline-none"
            />
          </div>
        </label>
        <div>
          <span className="block font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-ink">
            Sort by
          </span>
          <select
            value={filters.sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="mt-2 h-12 w-full rounded-[var(--radius-input)] border border-rule bg-surface px-3 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-ink focus-visible:border-signal focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/30 md:min-w-[12rem]"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Result count + active chips */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-y border-rule py-3">
        <p className="font-heading text-[12px] font-semibold uppercase tracking-[0.12em] text-ink">
          {resultCount} {resultCount === 1 ? "result" : "results"}
          {active ? <span className="text-muted-ink"> · filtered</span> : null}
          {pending ? <span className="ml-2 text-muted-ink/70">updating…</span> : null}
        </p>
        {active ? (
          <div className="flex flex-wrap items-center gap-2">
            {filters.q ? (
              <Chip onRemove={() => setQuery("")} label={`"${filters.q}"`} eyebrow="Search" />
            ) : null}
            {filters.verticals.map((slug) => (
              <Chip
                key={`v-${slug}`}
                eyebrow="Vertical"
                label={verticalsBySlug.get(slug) ?? slug}
                onRemove={() => removeVertical(slug)}
              />
            ))}
            {filters.features.map((slug) => (
              <Chip
                key={`f-${slug}`}
                eyebrow="Feature"
                label={featuresBySlug.get(slug) ?? slug}
                onRemove={() => removeFeature(slug)}
              />
            ))}
            {filters.capabilities.map((cap) => (
              <Chip
                key={`c-${cap}`}
                eyebrow="Capability"
                label={capabilityLabel(cap)}
                onRemove={() => removeCapability(cap)}
              />
            ))}
            <button
              type="button"
              onClick={() => router.replace(pathname, { scroll: false })}
              className="font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-signal underline-offset-4 hover:underline"
            >
              Clear all
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Chip({
  eyebrow,
  label,
  onRemove,
}: {
  eyebrow: string;
  label: string;
  onRemove: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="group inline-flex items-center gap-2 rounded-[var(--radius-button)] border border-rule bg-paper-deep/60 px-2.5 py-1 font-heading text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-soft transition-colors hover:border-signal hover:text-signal"
      aria-label={`Remove ${eyebrow} filter: ${label}`}
    >
      <span className="tracking-[0.16em] text-muted-ink/80 group-hover:text-signal">
        {eyebrow}
      </span>
      <span className="normal-case">{label}</span>
      <span aria-hidden className="text-base leading-none">
        ×
      </span>
    </button>
  );
}
