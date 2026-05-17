import type { Metadata } from "next";

import { CommercialLanding } from "@/components/marketing/commercial-landing";
import { COMMERCIAL_CONTRACTORS } from "@/lib/commercial-pages";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: COMMERCIAL_CONTRACTORS.metaTitle,
  description: COMMERCIAL_CONTRACTORS.metaDescription,
  path: `/${COMMERCIAL_CONTRACTORS.slug}`,
});

export const dynamic = "force-dynamic";

export default async function Page() {
  return <CommercialLanding config={COMMERCIAL_CONTRACTORS} />;
}
