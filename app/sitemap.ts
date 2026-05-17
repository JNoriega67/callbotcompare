import type { MetadataRoute } from "next";

import { COMMERCIAL_PAGES } from "@/lib/commercial-pages";
import { GUIDES_ORDERED } from "@/lib/guides";
import { INTEGRATION_PAGES } from "@/lib/integration-pages";
import { SERVICE_PACKAGES_ORDERED } from "@/lib/services";
import { SITE_URL } from "@/lib/constants";
import { prisma } from "@/lib/db";

// Generated at request time so we don't need a DB connection at build.
export const dynamic = "force-dynamic";
export const revalidate = 3600;

const base = SITE_URL.replace(/\/$/, "");

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
  { url: `${base}/vendors`, changeFrequency: "weekly", priority: 0.9 },
  { url: `${base}/compare`, changeFrequency: "weekly", priority: 0.9 },
  { url: `${base}/best-ai-receptionist-software`, changeFrequency: "weekly", priority: 0.9 },
  { url: `${base}/ai-receptionist-pricing`, changeFrequency: "monthly", priority: 0.9 },
  { url: `${base}/ai-receptionist-vs-virtual-receptionist`, changeFrequency: "monthly", priority: 0.85 },
  { url: `${base}/methodology`, changeFrequency: "yearly", priority: 0.6 },
  { url: `${base}/services`, changeFrequency: "monthly", priority: 0.75 },
  { url: `${base}/guides`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${base}/quiz`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.6 },
  { url: `${base}/disclosure`, changeFrequency: "yearly", priority: 0.3 },
];

const COMMERCIAL_ROUTES: MetadataRoute.Sitemap = Object.values(COMMERCIAL_PAGES).map((cfg) => ({
  url: `${base}/${cfg.slug}`,
  changeFrequency: "monthly" as const,
  priority: 0.85,
}));

const INTEGRATION_ROUTES: MetadataRoute.Sitemap = Object.values(INTEGRATION_PAGES).map((cfg) => ({
  url: `${base}/${cfg.slug}`,
  changeFrequency: "monthly" as const,
  priority: 0.8,
}));

const SERVICE_SUBPAGE_ROUTES: MetadataRoute.Sitemap = SERVICE_PACKAGES_ORDERED.map((pkg) => ({
  url: `${base}/services/${pkg.slug}`,
  changeFrequency: "monthly" as const,
  priority: 0.7,
}));

const GUIDE_ROUTES: MetadataRoute.Sitemap = GUIDES_ORDERED.map((g) => ({
  url: `${base}/guides/${g.slug}`,
  changeFrequency: "monthly" as const,
  priority: 0.75,
}));

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let vendorEntries: MetadataRoute.Sitemap = [];
  let comparisonEntries: MetadataRoute.Sitemap = [];

  try {
    const [vendors, comparisons] = await Promise.all([
      prisma.vendor.findMany({
        where: { isPublished: true },
        select: { slug: true, updatedAt: true },
      }),
      prisma.comparisonPage.findMany({
        where: { status: "PUBLISHED" },
        select: { slug: true, updatedAt: true },
      }),
    ]);

    vendorEntries = vendors.map((v) => ({
      url: `${base}/vendors/${v.slug}`,
      lastModified: v.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

    comparisonEntries = comparisons.map((c) => ({
      url: `${base}/compare/${c.slug}`,
      lastModified: c.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
  } catch {
    // DB not reachable at the moment (e.g. local dev without Neon).
    // Static routes still ship.
  }

  return [
    ...STATIC_ROUTES,
    ...COMMERCIAL_ROUTES,
    ...INTEGRATION_ROUTES,
    ...SERVICE_SUBPAGE_ROUTES,
    ...GUIDE_ROUTES,
    ...vendorEntries,
    ...comparisonEntries,
  ];
}
