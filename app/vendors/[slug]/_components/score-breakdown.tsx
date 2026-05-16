import { VendorScoreBar } from "@/components/vendors/vendor-score-bar";

type Vendor = {
  scoreCallHandling: number | null;
  scoreIntegrations: number | null;
  scoreAutomation: number | null;
  scoreEaseOfSetup: number | null;
  scorePricingValue: number | null;
  scoreVerticalFit: number | null;
  scoreHandoff: number | null;
  scoreReporting: number | null;
  scoreSupport: number | null;
};

const ROWS: Array<{ key: keyof Vendor; label: string }> = [
  { key: "scoreCallHandling", label: "Call handling" },
  { key: "scoreIntegrations", label: "Integrations" },
  { key: "scoreAutomation", label: "Workflow automation" },
  { key: "scoreHandoff", label: "Handoff & escalation" },
  { key: "scoreVerticalFit", label: "Vertical fit" },
  { key: "scoreEaseOfSetup", label: "Ease of setup" },
  { key: "scorePricingValue", label: "Pricing value" },
  { key: "scoreReporting", label: "Reporting" },
  { key: "scoreSupport", label: "Support" },
];

export function ScoreBreakdown({ vendor }: { vendor: Vendor }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {ROWS.map((row) => (
        <VendorScoreBar key={row.key} score={vendor[row.key]} label={row.label} />
      ))}
    </div>
  );
}
