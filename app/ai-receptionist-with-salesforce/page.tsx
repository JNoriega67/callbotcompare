import type { Metadata } from "next";

import { IntegrationLanding } from "@/components/marketing/integration-landing";
import { INTEGRATION_SALESFORCE } from "@/lib/integration-pages";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: INTEGRATION_SALESFORCE.metaTitle,
  description: INTEGRATION_SALESFORCE.metaDescription,
  path: `/${INTEGRATION_SALESFORCE.slug}`,
});

export const dynamic = "force-dynamic";

export default async function Page() {
  return <IntegrationLanding config={INTEGRATION_SALESFORCE} />;
}
