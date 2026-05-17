import { cn } from "@/lib/utils";

// New names: paper | deep | ink.
// Legacy names (cream | white | sage) kept so old pages keep compiling;
// each maps to a tone in the new palette.
type Tone = "paper" | "deep" | "ink" | "cream" | "white" | "sage";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  tone?: Tone;
  /** Removes default vertical padding when caller wants tighter control. */
  flush?: boolean;
};

const TONE_CLASS: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  deep: "bg-paper-deep text-ink",
  ink: "bg-ink text-paper",
  // Legacy aliases
  cream: "bg-paper text-ink",
  white: "bg-surface text-ink",
  sage: "bg-paper-deep text-ink",
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
