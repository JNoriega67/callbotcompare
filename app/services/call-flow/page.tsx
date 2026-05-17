import type { Metadata } from "next";

import { ServicePage } from "@/components/marketing/service-page";
import { SERVICE_CALL_FLOW } from "@/lib/services";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: SERVICE_CALL_FLOW.metaTitle,
  description: SERVICE_CALL_FLOW.metaDescription,
  path: `/services/${SERVICE_CALL_FLOW.slug}`,
});

export default function Page() {
  return <ServicePage pkg={SERVICE_CALL_FLOW} />;
}
