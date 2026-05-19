import Image from "next/image";

import { cn } from "@/lib/utils";

type WordmarkProps = {
  className?: string;
  /**
   * Light-on-dark variant. The brand image carries dark navy + teal
   * elements that disappear on the navy footer; we wrap it in a soft
   * paper pill so the logo stays legible without redrawing it for dark.
   */
  invert?: boolean;
};

/**
 * CallTreo wordmark. Renders the brand image (public/calltreo-logo.png).
 * The file contains both the mark and the wordmark text — text is no
 * longer split between SVG + DOM characters, so changes to brand color
 * tokens won't shift the visible logo.
 *
 * Width:height comes from the image's natural 1448:1086 aspect (~4:3).
 * Header callers typically render at ~36px tall; the inline width lets
 * the layout reserve the right space without CLS.
 */
export function Wordmark({ className, invert = false }: WordmarkProps) {
  return (
    <span
      className={cn(
        "inline-flex select-none items-center",
        invert && "rounded-md bg-paper/95 px-2 py-1",
        className,
      )}
      aria-label="CallTreo"
    >
      <Image
        src="/calltreo-logo.png"
        alt="CallTreo"
        width={144}
        height={108}
        priority
        className="h-8 w-auto md:h-9"
      />
    </span>
  );
}

/**
 * Icon-only re-export. We no longer ship a separate mark — every surface
 * uses the full wordmark image. Kept so any old import doesn't break.
 */
export const BrandMark = Wordmark;
