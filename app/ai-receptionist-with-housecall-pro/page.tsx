import type { Metadata } from "next";

import { IntegrationLanding } from "@/components/marketing/integration-landing";
import { INTEGRATION_HOUSECALL_PRO } from "@/lib/integration-pages";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: INTEGRATION_HOUSECALL_PRO.metaTitle,
  description: INTEGRATION_HOUSECALL_PRO.metaDescription,
  path: `/${INTEGRATION_HOUSECALL_PRO.slug}`,
});

export const dynamic = "force-dynamic";

export default async function Page() {
  return <IntegrationLanding config={INTEGRATION_HOUSECALL_PRO} />;
}
