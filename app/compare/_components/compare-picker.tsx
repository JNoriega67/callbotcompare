"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useTransition } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type PickerVendor = {
  slug: string;
  name: string;
  tagline: string | null;
  overallScore: number | null;
};

type ComparePickerProps = {
  vendors: PickerVendor[];
  /** Slug of a seeded ComparisonPage to jump to when selection matches exactly. */
  seededComparisons?: ReadonlyArray<{ slug: string; vendorSlugs: string[] }>;
};

const MAX_SELECTION = 3;

function parseSelected(sp: URLSearchParams): string[] {
  const raw = sp.get("vendors");
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, MAX_SELECTION);
}

export function ComparePicker({ vendors, seededComparisons = [] }: ComparePickerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const [, startTransition] = useTransition();

  const selected = useMemo(() => parseSelected(sp), [sp]);
  const selectedSet = new Set(selected);

  const update = useCallback(
    (next: string[]) => {
      const sorted = [...next].sort();
      const qs = sorted.length ? `?vendors=${sorted.join(",")}` : "";
      startTransition(() => {
        router.replace(`${pathname}${qs}`, { scroll: false });
      });
    },
    [router, pathname],
  );

  const toggle = (slug: string) => {
    if (selectedSet.has(slug)) {
      update(selected.filter((s) => s !== slug));
    } else if (selected.length < MAX_SELECTION) {
      update([...selected, slug]);
    }
  };

  const matchedSeeded = useMemo(() => {
    if (!selected.length) return null;
    const sortedSelected = [...selected].sort().join(",");
    return (
      seededComparisons.find((c) => [...c.vendorSlugs].sort().join(",") === sortedSelected) ?? null
    );
  }, [selected, seededComparisons]);

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-heading text-xl font-semibold text-ink">
            Pick up to {MAX_SELECTION} vendors
          </h2>
          <p className="text-sm text-muted-ink">
            Selection is shareable — the URL encodes which vendors you chose.
          </p>
        </div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-ink">
          {selected.length}/{MAX_SELECTION} selected
        </p>
      </header>

      <ul className="grid gap-2 sm:grid-cols-2">
        {vendors.map((v) => {
          const checked = selectedSet.has(v.slug);
          const disabled = !checked && selected.length >= MAX_SELECTION;
          return (
            <li key={v.slug}>
              <Label
                htmlFor={`compare-${v.slug}`}
                className={`flex cursor-pointer items-start justify-between gap-3 rounded-[var(--radius-card)] border bg-surface p-3 transition-colors ${
                  checked ? "border-teal" : "border-rule"
                } ${disabled ? "cursor-not-allowed opacity-60" : "hover:border-teal/60"}`}
              >
                <span className="flex items-start gap-3">
                  <Checkbox
                    id={`compare-${v.slug}`}
                    checked={checked}
                    onCheckedChange={() => !disabled && toggle(v.slug)}
                    disabled={disabled}
                  />
                  <span>
                    <span className="block font-heading text-sm font-semibold text-ink">
                      {v.name}
                    </span>
                    {v.tagline ? (
                      <span className="mt-0.5 block text-xs text-muted-ink">{v.tagline}</span>
                    ) : null}
                  </span>
                </span>
                <span className="shrink-0 font-heading text-sm font-bold text-ink">
                  {v.overallScore?.toFixed(1) ?? "—"}
                </span>
              </Label>
            </li>
          );
        })}
      </ul>

      {matchedSeeded ? (
        <Link
          href={`/compare/${matchedSeeded.slug}`}
          className="inline-flex items-center gap-2 rounded-[var(--radius-button)] bg-signal px-4 py-2.5 text-sm font-semibold text-signal-ink hover:bg-signal-hover"
        >
          View dedicated comparison page →
        </Link>
      ) : null}
    </div>
  );
}
