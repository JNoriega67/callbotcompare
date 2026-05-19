/**
 * Lightweight event-tracking stub. Replace with Plausible/PostHog later
 * by swapping the implementation; call sites stay the same.
 */
export function trackEvent(name: string, props?: Record<string, unknown>) {
  if (typeof window === "undefined") {
    console.log(`[event] ${name}`, props ?? {});
    return;
  }
  // Stub: no-op in the browser for MVP. Wire window.plausible / window.posthog later.
  if (process.env.NODE_ENV !== "production") {
    console.log(`[event] ${name}`, props ?? {});
  }
}
