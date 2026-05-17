import type { Metadata } from "next";

import { CommercialLanding } from "@/components/marketing/commercial-landing";
import { COMMERCIAL_CRM_INTEGRATION } from "@/lib/commercial-pages";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: COMMERCIAL_CRM_INTEGRATION.metaTitle,
  description: COMMERCIAL_CRM_INTEGRATION.metaDescription,
  path: `/${COMMERCIAL_CRM_INTEGRATION.slug}`,
});

export const dynamic = "force-dynamic";

export default async function Page() {
  return <CommercialLanding config={COMMERCIAL_CRM_INTEGRATION} />;
}
