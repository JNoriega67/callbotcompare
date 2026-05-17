import type { Metadata } from "next";

import { IntegrationLanding } from "@/components/marketing/integration-landing";
import { INTEGRATION_GOHIGHLEVEL } from "@/lib/integration-pages";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: INTEGRATION_GOHIGHLEVEL.metaTitle,
  description: INTEGRATION_GOHIGHLEVEL.metaDescription,
  path: `/${INTEGRATION_GOHIGHLEVEL.slug}`,
});

export const dynamic = "force-dynamic";

export default async function Page() {
  return <IntegrationLanding config={INTEGRATION_GOHIGHLEVEL} />;
}
