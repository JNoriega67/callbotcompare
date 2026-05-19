"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * SPA pageview tracker. Next.js App Router doesn't re-fire pageviews on
 * client-side navigations, so we listen for pathname/search changes and
 * call gtag('config', ...) manually. The initial pageview is sent below
 * by the inline init script.
 *
 * Wrapped in Suspense because useSearchParams() is a client boundary in
 * Next 15+ that requires its own suspense scope.
 */
function PageviewTracker({ gaId }: { gaId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window.gtag !== "function") return;
    const url = searchParams && searchParams.toString().length
      ? `${pathname}?${searchParams.toString()}`
      : pathname;
    window.gtag("config", gaId, { page_path: url });
  }, [gaId, pathname, searchParams]);

  return null;
}

/**
 * Click delegation for custom events. Any element with
 * `data-event="<name>"` becomes a tracked click; sibling `data-*`
 * attributes flow through as event params (data-slug → "slug").
 * Lets us add tracking by adding markup, not by importing hooks.
 */
function ClickDelegator() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const el = target.closest<HTMLElement>("[data-event]");
      if (!el) return;
      const name = el.dataset.event;
      if (!name) return;

      const params: Record<string, string> = {};
      for (const [key, value] of Object.entries(el.dataset)) {
        if (key === "event" || value == null) continue;
        params[key] = value;
      }
      if (typeof window.gtag === "function") {
        window.gtag("event", name, params);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}

export function GoogleAnalytics() {
  if (!GA_ID) return null;
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          // send_page_view: false because <PageviewTracker /> handles
          // both the initial load and SPA navigations explicitly.
          gtag('config', '${GA_ID}', { send_page_view: false });
        `}
      </Script>
      <Suspense fallback={null}>
        <PageviewTracker gaId={GA_ID} />
      </Suspense>
      <ClickDelegator />
    </>
  );
}
