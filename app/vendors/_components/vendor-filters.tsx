"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useTransition } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  CAPABILITIES,
  type Capability,
  type FilterParams,
  hasActiveFilters,
  parseFilters,
  toSearchParams,
} from "@/lib/filters";

type Option = { slug: string; name: string };

type VendorFiltersProps = {
  verticals: Option[];
  features: Option[];
  /** Sidebar shows sticky framing; sheet variant ditches the sidebar chrome. */
  layout?: "sidebar" | "stacked";
};

/**
 * Side filter for the vendors directory — owns the long checkbox lists
 * for verticals, features, and capabilities.
 *
 * Search and sort live in <DirectoryControls /> at the top of the page,
 * because they are the most-used controls and shouldn't be hidden in
 * the sidebar.
 */
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

  const clearAll = () => router.replace(pathname, { scroll: false });

  const Wrapper = layout === "sidebar" ? "aside" : "div";

  return (
    <Wrapper
      className={
        layout === "sidebar"
          ? "sticky top-24 hidden h-fit md:block"
          : ""
      }
      aria-label="Vendor filters"
    >
      <div
        className={
          layout === "sidebar"
            ? "rounded-[var(--radius-card)] border border-rule bg-surface"
            : ""
        }
      >
        <div className="space-y-6 p-5">
          <div className="flex items-baseline justify-between">
            <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
              Refine
            </p>
            {hasActiveFilters(filters) ? (
              <button
                type="button"
                onClick={clearAll}
                className="font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-signal underline-offset-4 hover:underline"
              >
                Clear all
              </button>
            ) : null}
          </div>

          <FilterGroup title="Capability">
            {CAPABILITIES.map(({ value, label }) => (
              <CheckboxRow
                key={value}
                id={`cap-${value}-${layout}`}
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
                id={`vert-${v.slug}-${layout}`}
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
                id={`feat-${f.slug}-${layout}`}
                label={f.name}
                checked={filters.features.includes(f.slug)}
                onToggle={() => toggleArrayValue("features", f.slug)}
              />
            ))}
          </FilterGroup>
        </div>
      </div>
    </Wrapper>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2.5 border-t border-rule pt-5 first-of-type:border-t-0 first-of-type:pt-0">
      <h3 className="font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
        {title}
      </h3>
      <div className="space-y-2">{children}</div>
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
    <div className="flex items-center gap-2.5">
      <Checkbox id={id} checked={checked} onCheckedChange={onToggle} />
      <Label
        htmlFor={id}
        className="cursor-pointer text-sm font-normal text-ink-soft transition-colors hover:text-ink"
      >
        {label}
      </Label>
    </div>
  );
}
