import type { Metadata } from "next";

import { SITE_NAME, SITE_URL } from "@/lib/constants";

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  ogImage,
  noIndex,
}: BuildMetadataInput): Metadata {
  const url = path.startsWith("http") ? path : `${SITE_URL.replace(/\/$/, "")}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}

/* ----- JSON-LD generators ----- */

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  } as const;
}

export type VendorJsonLdInput = {
  name: string;
  slug: string;
  description?: string | null;
  websiteUrl?: string | null;
  overallScore?: number | null;
};

export function vendorJsonLd(vendor: VendorJsonLdInput) {
  const url = `${SITE_URL.replace(/\/$/, "")}/vendors/${vendor.slug}`;
  const review = vendor.overallScore
    ? {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: vendor.overallScore,
          bestRating: 10,
          worstRating: 0,
          ratingCount: 1,
        },
      }
    : {};

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: vendor.name,
    description: vendor.description ?? undefined,
    url,
    brand: {
      "@type": "Brand",
      name: vendor.name,
    },
    sameAs: vendor.websiteUrl ? [vendor.websiteUrl] : undefined,
    ...review,
  } as const;
}

export type ComparisonJsonLdVendor = {
  name: string;
  slug: string;
  description?: string | null;
};

export function comparisonJsonLd(input: {
  title: string;
  slug: string;
  vendors: ComparisonJsonLdVendor[];
}) {
  const url = `${SITE_URL.replace(/\/$/, "")}/compare/${input.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: input.title,
    url,
    itemListElement: input.vendors.map((v, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: v.name,
        url: `${SITE_URL.replace(/\/$/, "")}/vendors/${v.slug}`,
        description: v.description ?? undefined,
      },
    })),
  } as const;
}

export type FaqJsonLdItem = { question: string; answer: string };

export function faqJsonLd(items: ReadonlyArray<FaqJsonLdItem>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  } as const;
}

export type BreadcrumbItem = { label: string; href: string };

export function breadcrumbJsonLd(trail: ReadonlyArray<BreadcrumbItem>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: item.href.startsWith("http")
        ? item.href
        : `${SITE_URL.replace(/\/$/, "")}${item.href}`,
    })),
  } as const;
}
