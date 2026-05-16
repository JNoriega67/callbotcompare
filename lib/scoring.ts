/**
 * Vendor scoring helper.
 * Reference: docs/SCORING_RUBRIC.md
 */

export const WEIGHTS = Object.freeze({
  callHandling: 0.2,
  integrations: 0.15,
  automation: 0.15,
  easeOfSetup: 0.1,
  pricingValue: 0.1,
  verticalFit: 0.1,
  handoff: 0.1,
  reporting: 0.05,
  support: 0.05,
});

export type ScoreDimensions = {
  callHandling: number | null;
  integrations: number | null;
  automation: number | null;
  easeOfSetup: number | null;
  pricingValue: number | null;
  verticalFit: number | null;
  handoff: number | null;
  reporting: number | null;
  support: number | null;
};

/**
 * Compute the weighted overall score from dimension scores.
 * Strict mode: returns null if any dimension is missing.
 *
 * Display surfaces should prefer `vendor.overallScore` from the seed/editor
 * (single source of truth). This helper is intended for a future recalc tool.
 */
export function computeOverallScore(dims: ScoreDimensions): number | null {
  const values = Object.values(dims);
  if (values.some((v) => v === null || v === undefined)) return null;

  const total =
    (dims.callHandling as number) * WEIGHTS.callHandling +
    (dims.integrations as number) * WEIGHTS.integrations +
    (dims.automation as number) * WEIGHTS.automation +
    (dims.easeOfSetup as number) * WEIGHTS.easeOfSetup +
    (dims.pricingValue as number) * WEIGHTS.pricingValue +
    (dims.verticalFit as number) * WEIGHTS.verticalFit +
    (dims.handoff as number) * WEIGHTS.handoff +
    (dims.reporting as number) * WEIGHTS.reporting +
    (dims.support as number) * WEIGHTS.support;

  return Math.round(total * 10) / 10;
}

export function formatScore(score: number | null | undefined): string {
  if (score === null || score === undefined) return "—";
  return score.toFixed(1);
}

export function formatPricing(
  fromUsd: number | null | undefined,
  pricingModel: string | null | undefined,
): string {
  if (fromUsd === null || fromUsd === undefined) {
    if (pricingModel === "CUSTOM_QUOTE") return "On request";
    return "—";
  }
  return `From $${fromUsd}/mo`;
}

export const SETUP_LABELS: Record<number, string> = {
  1: "Plug-and-play",
  2: "Light setup",
  3: "Moderate setup",
  4: "Hands-on setup",
  5: "Custom build",
};

export function formatSetupComplexity(value: number | null | undefined): string {
  if (value === null || value === undefined) return "—";
  return SETUP_LABELS[value] ?? `${value}/5`;
}
