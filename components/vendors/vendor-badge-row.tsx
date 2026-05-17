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
    <ul className="flex flex-wrap gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
      {enabled.map((c) => (
        <li key={c.label} className="border border-rule-strong px-2 py-1">
          {c.label}
        </li>
      ))}
    </ul>
  );
}
