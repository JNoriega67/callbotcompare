type QuizProgressProps = {
  current: number;
  total: number;
};

export function QuizProgress({ current, total }: QuizProgressProps) {
  const pct = Math.round(((current + 1) / total) * 100);
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between text-xs font-semibold uppercase tracking-wide text-muted-ink">
        <span>
          Step {current + 1} of {total}
        </span>
        <span>{pct}%</span>
      </div>
      <div
        className="h-1.5 w-full overflow-hidden rounded-full"
        style={{ backgroundColor: "var(--brand-border-soft)" }}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
      >
        <div className="h-full bg-signal transition-[width]" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
