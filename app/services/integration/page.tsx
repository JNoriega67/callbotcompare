import type { Metadata } from "next";

import { ServicePage } from "@/components/marketing/service-page";
import { SERVICE_INTEGRATION } from "@/lib/services";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: SERVICE_INTEGRATION.metaTitle,
  description: SERVICE_INTEGRATION.metaDescription,
  path: `/services/${SERVICE_INTEGRATION.slug}`,
});

export default function Page() {
  return <ServicePage pkg={SERVICE_INTEGRATION} />;
}
