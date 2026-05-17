import { cn } from "@/lib/utils";

type WordmarkProps = {
  className?: string;
  /** Light-on-dark variant for use on dark footer/section backgrounds. */
  invert?: boolean;
};

/**
 * CallTreo wordmark = inline SVG mark + 2-tone wordmark text.
 *  - 'Call' in deep teal (matches logo)
 *  - 'Treo' in bright teal (matches logo)
 *  - SVG icon mimics the logo's speech-bubble + smile + sparkle
 *
 * If a raster public/logo.png is dropped in later, swap the inner
 * markup for an <Image /> — the surrounding API stays the same.
 */
export function Wordmark({ className, invert = false }: WordmarkProps) {
  return (
    <span
      className={cn("inline-flex select-none items-center gap-2.5", className)}
      aria-label="CallTreo"
    >
      <BrandMark className="h-7 w-7 md:h-8 md:w-8" invert={invert} />
      <span
        className={cn(
          "font-heading text-[1.15em] font-bold leading-none",
          invert ? "text-paper" : "text-signal-deep",
        )}
        style={{ letterSpacing: "-0.022em" }}
      >
        Call
        <span className={cn(invert ? "text-paper" : "text-signal")}>Treo</span>
      </span>
    </span>
  );
}

/**
 * Icon-only mark. Same paths as the favicon (/app/icon.svg) so they
 * stay visually consistent. Inherits color via tokens.
 */
export function BrandMark({
  className,
  invert = false,
}: {
  className?: string;
  invert?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="CallTreo mark"
    >
      <defs>
        <linearGradient id="ct-bubble" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--signal)" />
          <stop offset="100%" stopColor="var(--signal-deep)" />
        </linearGradient>
      </defs>
      {/* Speech bubble with bottom-left tail */}
      <path
        d="M32 4 C50 4 60 17 60 32 C60 47 50 58 32 58 L20 58 L24 50 C12 46 4 40 4 32 C4 17 14 4 32 4 Z"
        fill={invert ? "var(--paper)" : "url(#ct-bubble)"}
      />
      {/* Eyes */}
      <circle cx="25" cy="27" r="2.6" fill={invert ? "var(--signal-deep)" : "white"} />
      <circle cx="39" cy="27" r="2.6" fill={invert ? "var(--signal-deep)" : "white"} />
      {/* Smile */}
      <path
        d="M23 34 Q32 43 41 34"
        stroke={invert ? "var(--signal-deep)" : "white"}
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />
      {/* Sparkle */}
      <path
        d="M52 12 L53 16 L57 17 L53 18 L52 22 L51 18 L47 17 L51 16 Z"
        fill="var(--accent-warm)"
      />
    </svg>
  );
}
