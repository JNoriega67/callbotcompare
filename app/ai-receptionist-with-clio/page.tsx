import type { Metadata } from "next";

import { IntegrationLanding } from "@/components/marketing/integration-landing";
import { INTEGRATION_CLIO } from "@/lib/integration-pages";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: INTEGRATION_CLIO.metaTitle,
  description: INTEGRATION_CLIO.metaDescription,
  path: `/${INTEGRATION_CLIO.slug}`,
});

export const dynamic = "force-dynamic";

export default async function Page() {
  return <IntegrationLanding config={INTEGRATION_CLIO} />;
}
