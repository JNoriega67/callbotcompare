import type { Metadata } from "next";

import { ServicePage } from "@/components/marketing/service-page";
import { SERVICE_VENDOR_SELECTION } from "@/lib/services";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: SERVICE_VENDOR_SELECTION.metaTitle,
  description: SERVICE_VENDOR_SELECTION.metaDescription,
  path: `/services/${SERVICE_VENDOR_SELECTION.slug}`,
});

export default function Page() {
  return <ServicePage pkg={SERVICE_VENDOR_SELECTION} />;
}
