import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GuidePage } from "@/components/marketing/guide-page";
import { GUIDES } from "@/lib/guides";
import { buildMetadata } from "@/lib/seo";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return Object.values(GUIDES).map((g) => ({ slug: g.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const guide = GUIDES[slug];
  if (!guide) {
    return buildMetadata({
      title: "Guide not found",
      description: "",
      path: `/guides/${slug}`,
      noIndex: true,
    });
  }
  return buildMetadata({
    title: guide.metaTitle,
    description: guide.metaDescription,
    path: `/guides/${guide.slug}`,
  });
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  const guide = GUIDES[slug];
  if (!guide) notFound();
  return <GuidePage guide={guide} />;
}
