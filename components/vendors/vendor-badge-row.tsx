import { Badge } from "@/components/ui/badge";

type Capability = {
  enabled: boolean | null;
  label: string;
};

type VendorBadgeRowProps = {
  vendor: {
    hasAppointmentBooking: boolean | null;
    hasCrmIntegration: boolean | null;
    hasHumanHandoff: boolean | null;
    hasMultilingual: boolean | null;
    has24x7: boolean | null;
    hipaaFriendly: boolean | null;
  };
  /** Max badges to render. Defaults to 3 (per docs/COMPONENT_UI_SPEC.md). */
  limit?: number;
};

export function VendorBadgeRow({ vendor, limit = 3 }: VendorBadgeRowProps) {
  const all: Capability[] = [
    { enabled: vendor.hasAppointmentBooking, label: "Booking" },
    { enabled: vendor.hasCrmIntegration, label: "CRM" },
    { enabled: vendor.hasHumanHandoff, label: "Handoff" },
    { enabled: vendor.has24x7, label: "24/7" },
    { enabled: vendor.hasMultilingual, label: "Multilingual" },
    { enabled: vendor.hipaaFriendly, label: "HIPAA" },
  ];
  const enabled = all.filter((c) => c.enabled === true).slice(0, limit);
  if (!enabled.length) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {enabled.map((c) => (
        <Badge
          key={c.label}
          variant="secondary"
          className="rounded-full border-transparent bg-sage text-xs font-medium text-slate"
        >
          {c.label}
        </Badge>
      ))}
    </div>
  );
}
