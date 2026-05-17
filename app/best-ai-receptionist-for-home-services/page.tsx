import type { Metadata } from "next";

import { CommercialLanding } from "@/components/marketing/commercial-landing";
import { COMMERCIAL_HOME_SERVICES } from "@/lib/commercial-pages";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: COMMERCIAL_HOME_SERVICES.metaTitle,
  description: COMMERCIAL_HOME_SERVICES.metaDescription,
  path: `/${COMMERCIAL_HOME_SERVICES.slug}`,
});

export const dynamic = "force-dynamic";

export default async function Page() {
  return <CommercialLanding config={COMMERCIAL_HOME_SERVICES} />;
}
