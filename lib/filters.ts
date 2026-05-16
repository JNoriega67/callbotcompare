/**
 * URL <-> filter param <-> Prisma where helpers for the vendor directory.
 *
 * Source of truth for capability filtering is the denormalized Vendor.hasX
 * booleans (single fast query). The Feature taxonomy stays for future
 * per-feature attributes and editor convenience.
 */

import type { Prisma } from "@prisma/client";

export type Capability = "booking" | "crm" | "handoff" | "multilingual" | "247" | "hipaa";

export const CAPABILITIES: ReadonlyArray<{ value: Capability; label: string }> = [
  { value: "booking", label: "Appointment booking" },
  { value: "crm", label: "CRM integration" },
  { value: "handoff", label: "Human handoff" },
  { value: "multilingual", label: "Multilingual" },
  { value: "247", label: "24/7 coverage" },
  { value: "hipaa", label: "HIPAA-friendly" },
];

export type SortKey = "score" | "price" | "name" | "newest";

export const SORT_OPTIONS: ReadonlyArray<{ value: SortKey; label: string }> = [
  { value: "score", label: "Editor score" },
  { value: "price", label: "Starting price" },
  { value: "name", label: "Vendor name" },
  { value: "newest", label: "Newest" },
];

export type FilterParams = {
  q?: string;
  verticals: string[];
  features: string[];
  pricingMax?: number;
  capabilities: Capability[];
  sort: SortKey;
};

const DEFAULT_FILTERS: FilterParams = Object.freeze({
  q: undefined,
  verticals: [],
  features: [],
  pricingMax: undefined,
  capabilities: [],
  sort: "score",
}) as FilterParams;

function splitCsv(value: string | null): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function isCapability(value: string): value is Capability {
  return CAPABILITIES.some((c) => c.value === value);
}

function isSort(value: string): value is SortKey {
  return SORT_OPTIONS.some((s) => s.value === value);
}

export function parseFilters(
  sp: URLSearchParams | Record<string, string | string[] | undefined>,
): FilterParams {
  const get = (key: string): string | null => {
    if (sp instanceof URLSearchParams) return sp.get(key);
    const v = sp[key];
    if (Array.isArray(v)) return v[0] ?? null;
    return v ?? null;
  };

  const sortRaw = get("sort");
  const pricingMaxRaw = get("pricingMax");
  const pricingMax =
    pricingMaxRaw && !Number.isNaN(Number(pricingMaxRaw))
      ? Math.max(0, Number(pricingMaxRaw))
      : undefined;

  return {
    q: get("q")?.trim() || undefined,
    verticals: splitCsv(get("verticals")),
    features: splitCsv(get("features")),
    pricingMax,
    capabilities: splitCsv(get("capabilities")).filter(isCapability),
    sort: sortRaw && isSort(sortRaw) ? sortRaw : "score",
  };
}

export function toSearchParams(filters: FilterParams): string {
  const params = new URLSearchParams();
  if (filters.q) params.set("q", filters.q);
  if (filters.verticals.length) params.set("verticals", filters.verticals.join(","));
  if (filters.features.length) params.set("features", filters.features.join(","));
  if (filters.capabilities.length) params.set("capabilities", filters.capabilities.join(","));
  if (filters.pricingMax !== undefined) params.set("pricingMax", String(filters.pricingMax));
  if (filters.sort && filters.sort !== "score") params.set("sort", filters.sort);
  return params.toString();
}

export function filtersToPrismaWhere(filters: FilterParams): Prisma.VendorWhereInput {
  const where: Prisma.VendorWhereInput = {
    isPublished: true,
  };

  const AND: Prisma.VendorWhereInput[] = [];

  if (filters.q) {
    AND.push({
      OR: [
        { name: { contains: filters.q, mode: "insensitive" } },
        { tagline: { contains: filters.q, mode: "insensitive" } },
        { summary: { contains: filters.q, mode: "insensitive" } },
        { bestFor: { contains: filters.q, mode: "insensitive" } },
      ],
    });
  }

  if (filters.verticals.length) {
    AND.push({
      vendorVerticals: {
        some: { vertical: { slug: { in: filters.verticals } } },
      },
    });
  }

  if (filters.features.length) {
    AND.push({
      vendorFeatures: {
        some: { feature: { slug: { in: filters.features } } },
      },
    });
  }

  for (const capability of filters.capabilities) {
    switch (capability) {
      case "booking":
        AND.push({ hasAppointmentBooking: true });
        break;
      case "crm":
        AND.push({ hasCrmIntegration: true });
        break;
      case "handoff":
        AND.push({ hasHumanHandoff: true });
        break;
      case "multilingual":
        AND.push({ hasMultilingual: true });
        break;
      case "247":
        AND.push({ has24x7: true });
        break;
      case "hipaa":
        AND.push({ hipaaFriendly: true });
        break;
    }
  }

  if (filters.pricingMax !== undefined) {
    AND.push({ pricingFromUsd: { lte: filters.pricingMax } });
  }

  if (AND.length) where.AND = AND;
  return where;
}

export function filtersToOrderBy(filters: FilterParams): Prisma.VendorOrderByWithRelationInput[] {
  switch (filters.sort) {
    case "name":
      return [{ name: "asc" }];
    case "newest":
      return [{ createdAt: "desc" }];
    case "price":
      // Nulls last: vendors without a price drop to the bottom
      return [{ pricingFromUsd: { sort: "asc", nulls: "last" } }, { overallScore: "desc" }];
    case "score":
    default:
      return [{ overallScore: { sort: "desc", nulls: "last" } }, { name: "asc" }];
  }
}

export function hasActiveFilters(filters: FilterParams): boolean {
  return Boolean(
    filters.q ||
      filters.verticals.length ||
      filters.features.length ||
      filters.capabilities.length ||
      filters.pricingMax !== undefined,
  );
}

export { DEFAULT_FILTERS };
