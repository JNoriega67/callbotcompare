import type { Metadata } from "next";

import { CommercialLanding } from "@/components/marketing/commercial-landing";
import { COMMERCIAL_LAW_FIRMS } from "@/lib/commercial-pages";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: COMMERCIAL_LAW_FIRMS.metaTitle,
  description: COMMERCIAL_LAW_FIRMS.metaDescription,
  path: `/${COMMERCIAL_LAW_FIRMS.slug}`,
});

export const dynamic = "force-dynamic";

export default async function Page() {
  return <CommercialLanding config={COMMERCIAL_LAW_FIRMS} />;
}
