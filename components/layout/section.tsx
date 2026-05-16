import { cn } from "@/lib/utils";

type Tone = "cream" | "white" | "sage";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  tone?: Tone;
  /** Removes default vertical padding when caller wants tighter control. */
  flush?: boolean;
};

const TONE_CLASS: Record<Tone, string> = {
  cream: "bg-background",
  white: "bg-surface",
  sage: "bg-surface-alt",
};

export function Section({
  tone = "cream",
  flush = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(TONE_CLASS[tone], !flush && "py-16 md:py-24", className)}
      {...props}
    >
      {children}
    </section>
  );
}
