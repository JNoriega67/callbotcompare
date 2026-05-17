import { cn } from "@/lib/utils";

// New names: paper | deep | ink | tint | hint
//   - paper:       primary off-white page bg
//   - deep:        slightly darker off-white for alternating sections
//   - ink:         dark slate-blue, white text (footer / dark CTA bands)
//   - tint:        pale sage (subtle warm green-blue for trust/methodology blocks)
//   - hint:        soft highlight blue (subtle cool blue for editorial callouts)
//
// Legacy names (cream | white | sage) kept so older code keeps compiling.
type Tone = "paper" | "deep" | "ink" | "tint" | "hint" | "cream" | "white" | "sage";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  tone?: Tone;
  /** Removes default vertical padding when caller wants tighter control. */
  flush?: boolean;
};

const TONE_CLASS: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  deep: "bg-paper-deep text-ink",
  ink: "bg-ink text-paper",
  tint: "bg-pale-sage text-ink",
  hint: "bg-soft-highlight-blue text-ink",
  // Legacy aliases
  cream: "bg-paper text-ink",
  white: "bg-surface text-ink",
  sage: "bg-pale-sage text-ink",
};

export function Section({
  tone = "paper",
  flush = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn(TONE_CLASS[tone], !flush && "py-16 md:py-24", className)} {...props}>
      {children}
    </section>
  );
}
