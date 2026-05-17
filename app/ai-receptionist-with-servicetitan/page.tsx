import type { Metadata } from "next";

import { IntegrationLanding } from "@/components/marketing/integration-landing";
import { INTEGRATION_SERVICETITAN } from "@/lib/integration-pages";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: INTEGRATION_SERVICETITAN.metaTitle,
  description: INTEGRATION_SERVICETITAN.metaDescription,
  path: `/${INTEGRATION_SERVICETITAN.slug}`,
});

export const dynamic = "force-dynamic";

export default async function Page() {
  return <IntegrationLanding config={INTEGRATION_SERVICETITAN} />;
}
