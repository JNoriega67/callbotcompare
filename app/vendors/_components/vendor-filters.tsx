"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useTransition } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

type VendorFiltersProps = {
  verticals: Option[];
  features: Option[];
  /** When rendered inside the mobile sheet, swap to a vertical-stack layout. */
  layout?: "sidebar" | "stacked";
};

export function VendorFilters({ verticals, features, layout = "sidebar" }: VendorFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const [, startTransition] = useTransition();

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

  const toggleArrayValue = (key: "verticals" | "features", slug: string) => {
    const set = new Set(filters[key]);
    if (set.has(slug)) set.delete(slug);
    else set.add(slug);
    update({ ...filters, [key]: Array.from(set) });
  };

  const toggleCapability = (cap: Capability) => {
    const set = new Set(filters.capabilities);
    if (set.has(cap)) set.delete(cap);
    else set.add(cap);
    update({ ...filters, capabilities: Array.from(set) });
  };

  const setSort = (sort: SortKey) => update({ ...filters, sort });
  const setQuery = (q: string) => update({ ...filters, q: q.trim() || undefined });
  const clearAll = () => router.replace(pathname, { scroll: false });

  const Wrapper = layout === "sidebar" ? "aside" : "div";

  return (
    <Wrapper
      className={
        layout === "sidebar"
          ? "sticky top-20 hidden h-fit space-y-7 rounded-card border border-border bg-surface p-5 md:block"
          : "space-y-7"
      }
      aria-label="Vendor filters"
    >
      <div className="space-y-2">
        <Label htmlFor="vendor-search" className="text-xs font-semibold uppercase tracking-wide text-muted">
          Search
        </Label>
        <Input
          id="vendor-search"
          type="search"
          inputMode="search"
          placeholder="Vendor name…"
          defaultValue={filters.q ?? ""}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-surface"
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="vendor-sort"
          className="text-xs font-semibold uppercase tracking-wide text-muted"
        >
          Sort by
        </Label>
        <select
          id="vendor-sort"
          value={filters.sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="h-9 w-full rounded-[var(--radius-input)] border border-border bg-surface px-3 text-sm text-charcoal focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <FilterGroup title="Capability">
        {CAPABILITIES.map(({ value, label }) => (
          <CheckboxRow
            key={value}
            id={`cap-${value}`}
            label={label}
            checked={filters.capabilities.includes(value)}
            onToggle={() => toggleCapability(value)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Vertical">
        {verticals.map((v) => (
          <CheckboxRow
            key={v.slug}
            id={`vert-${v.slug}`}
            label={v.name}
            checked={filters.verticals.includes(v.slug)}
            onToggle={() => toggleArrayValue("verticals", v.slug)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Feature">
        {features.map((f) => (
          <CheckboxRow
            key={f.slug}
            id={`feat-${f.slug}`}
            label={f.name}
            checked={filters.features.includes(f.slug)}
            onToggle={() => toggleArrayValue("features", f.slug)}
          />
        ))}
      </FilterGroup>

      {hasActiveFilters(filters) ? (
        <button
          type="button"
          onClick={clearAll}
          className="text-xs font-semibold uppercase tracking-wide text-teal hover:underline"
        >
          Clear all filters
        </button>
      ) : null}
    </Wrapper>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">{title}</h3>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function CheckboxRow({
  id,
  label,
  checked,
  onToggle,
}: {
  id: string;
  label: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id={id} checked={checked} onCheckedChange={onToggle} />
      <Label htmlFor={id} className="cursor-pointer text-sm font-normal text-charcoal">
        {label}
      </Label>
    </div>
  );
}
