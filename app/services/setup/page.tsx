import type { Metadata } from "next";

import { ServicePage } from "@/components/marketing/service-page";
import { SERVICE_SETUP } from "@/lib/services";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: SERVICE_SETUP.metaTitle,
  description: SERVICE_SETUP.metaDescription,
  path: `/services/${SERVICE_SETUP.slug}`,
});

export default function Page() {
  return <ServicePage pkg={SERVICE_SETUP} />;
}
