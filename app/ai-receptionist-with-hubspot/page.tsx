import type { Metadata } from "next";

import { IntegrationLanding } from "@/components/marketing/integration-landing";
import { INTEGRATION_HUBSPOT } from "@/lib/integration-pages";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: INTEGRATION_HUBSPOT.metaTitle,
  description: INTEGRATION_HUBSPOT.metaDescription,
  path: `/${INTEGRATION_HUBSPOT.slug}`,
});

export const dynamic = "force-dynamic";

export default async function Page() {
  return <IntegrationLanding config={INTEGRATION_HUBSPOT} />;
}
