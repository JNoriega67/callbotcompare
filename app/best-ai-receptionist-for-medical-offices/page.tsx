import type { Metadata } from "next";

import { CommercialLanding } from "@/components/marketing/commercial-landing";
import { COMMERCIAL_MEDICAL } from "@/lib/commercial-pages";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: COMMERCIAL_MEDICAL.metaTitle,
  description: COMMERCIAL_MEDICAL.metaDescription,
  path: `/${COMMERCIAL_MEDICAL.slug}`,
});

export const dynamic = "force-dynamic";

export default async function Page() {
  return <CommercialLanding config={COMMERCIAL_MEDICAL} />;
}
