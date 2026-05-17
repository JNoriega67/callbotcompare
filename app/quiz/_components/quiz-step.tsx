import { cn } from "@/lib/utils";

export type QuizOption = { value: string; label: string; hint?: string };

type QuizStepProps = {
  question: string;
  helper?: string;
  options: QuizOption[];
  value: string | null;
  onSelect: (value: string) => void;
};

export function QuizStep({ question, helper, options, value, onSelect }: QuizStepProps) {
  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h2 className="font-heading text-2xl font-semibold text-ink">{question}</h2>
        {helper ? <p className="text-sm text-muted-ink">{helper}</p> : null}
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((opt) => {
          const checked = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onSelect(opt.value)}
              className={cn(
                "rounded-[var(--radius-card)] border bg-surface p-4 text-left transition-colors",
                checked
                  ? "border-teal bg-signal-soft/40"
                  : "border-rule hover:border-teal/60",
              )}
              aria-pressed={checked}
            >
              <span className="font-heading text-sm font-semibold text-ink">{opt.label}</span>
              {opt.hint ? <span className="mt-1 block text-xs text-muted-ink">{opt.hint}</span> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
