import type { Metadata } from "next";

import { IntegrationLanding } from "@/components/marketing/integration-landing";
import { INTEGRATION_PIPEDRIVE } from "@/lib/integration-pages";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: INTEGRATION_PIPEDRIVE.metaTitle,
  description: INTEGRATION_PIPEDRIVE.metaDescription,
  path: `/${INTEGRATION_PIPEDRIVE.slug}`,
});

export const dynamic = "force-dynamic";

export default async function Page() {
  return <IntegrationLanding config={INTEGRATION_PIPEDRIVE} />;
}
