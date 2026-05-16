"use client";

import { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VendorFilters } from "@/app/vendors/_components/vendor-filters";

type Option = { slug: string; name: string };

type MobileFilterSheetProps = {
  verticals: Option[];
  features: Option[];
};

export function MobileFilterSheet({ verticals, features }: MobileFilterSheetProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="inline-flex items-center gap-2 rounded-[var(--radius-button)] border border-border bg-surface px-3 py-2 text-sm font-medium text-slate md:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
          aria-hidden
        >
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="7" y1="12" x2="17" y2="12" />
          <line x1="10" y1="18" x2="14" y2="18" />
        </svg>
        Filters
      </SheetTrigger>
      <SheetContent side="left" className="w-[90vw] max-w-md overflow-y-auto bg-surface p-6">
        <SheetHeader className="mb-4">
          <SheetTitle className="font-heading text-lg font-semibold text-slate">
            Filter vendors
          </SheetTitle>
          <SheetDescription className="sr-only">
            Narrow the directory by capability, vertical, or feature.
          </SheetDescription>
        </SheetHeader>
        <VendorFilters verticals={verticals} features={features} layout="stacked" />
      </SheetContent>
    </Sheet>
  );
}
