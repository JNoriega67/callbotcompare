import type { Metadata } from "next";

import { IntegrationLanding } from "@/components/marketing/integration-landing";
import { INTEGRATION_CALENDLY } from "@/lib/integration-pages";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: INTEGRATION_CALENDLY.metaTitle,
  description: INTEGRATION_CALENDLY.metaDescription,
  path: `/${INTEGRATION_CALENDLY.slug}`,
});

export const dynamic = "force-dynamic";

export default async function Page() {
  return <IntegrationLanding config={INTEGRATION_CALENDLY} />;
}
