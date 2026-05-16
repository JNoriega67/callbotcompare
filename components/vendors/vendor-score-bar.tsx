import { formatScore } from "@/lib/scoring";
import { cn } from "@/lib/utils";

type VendorScoreBarProps = {
  score: number | null | undefined;
  label?: string;
  /** Out of 10. Used to size the bar fill. */
  max?: number;
  className?: string;
};

export function VendorScoreBar({ score, label, max = 10, className }: VendorScoreBarProps) {
  const pct = score === null || score === undefined ? 0 : Math.max(0, Math.min(100, (score / max) * 100));
  return (
    <div className={cn("space-y-1", className)}>
      {label ? (
        <div className="flex items-baseline justify-between gap-2 text-sm">
          <span className="text-charcoal/80">{label}</span>
          <span className="font-heading font-semibold text-slate">{formatScore(score)}</span>
        </div>
      ) : null}
      <div
        className="h-1.5 w-full rounded-full bg-border-soft"
        style={{ backgroundColor: "var(--brand-border-soft)" }}
        role="progressbar"
        aria-valuenow={score ?? 0}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        <div
          className="h-full rounded-full bg-primary transition-[width]"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
