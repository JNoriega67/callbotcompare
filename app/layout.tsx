import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Toaster } from "@/components/ui/sonner";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

import "./globals.css";

// Montserrat headings: 300 (light) and 700 (bold) do the editorial
// dual-weight headline contrast; 500/600 cover shadcn primitives + CTAs.
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Compare AI receptionist software`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "Compare AI receptionist and AI phone agent vendors side by side. Independent reviews, real evaluation criteria, and concierge help choosing the right tool.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
