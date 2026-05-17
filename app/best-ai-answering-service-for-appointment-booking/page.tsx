import type { Metadata } from "next";

import { CommercialLanding } from "@/components/marketing/commercial-landing";
import { COMMERCIAL_BOOKING } from "@/lib/commercial-pages";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: COMMERCIAL_BOOKING.metaTitle,
  description: COMMERCIAL_BOOKING.metaDescription,
  path: `/${COMMERCIAL_BOOKING.slug}`,
});

export const dynamic = "force-dynamic";

export default async function Page() {
  return <CommercialLanding config={COMMERCIAL_BOOKING} />;
}
