"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LeadSchema, type LeadInput } from "@/lib/leads";

type LeadFormProps = {
  /** Hidden fields appended to the submission (source + any context). */
  hidden?: { source: "contact" | "concierge"; recommendedVendors?: string[] };
  /** Heading rendered above the form. */
  heading?: string;
  /** Submit button label. */
  submitLabel?: string;
};

type Submission = LeadInput & { recommendedVendors?: string[] };

export function LeadForm({
  hidden = { source: "contact" },
  heading,
  submitLabel = "Send",
}: LeadFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LeadInput>({
    resolver: zodResolver(LeadSchema),
    defaultValues: { name: "", email: "" },
  });

  const onSubmit: SubmitHandler<LeadInput> = async (values) => {
    const body: Submission = { ...values };
    if (hidden.recommendedVendors?.length) body.recommendedVendors = hidden.recommendedVendors;
    try {
      const response = await fetch(`/api/leads?source=${hidden.source}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error ?? "Submission failed");
      }
      toast.success("Got it. We'll be in touch shortly.");
      reset();
      setSubmitted(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Submission failed");
    }
  };

  if (submitted) {
    return (
      <div className="rounded-card border border-border bg-sage/50 p-6">
        <h3 className="font-heading text-lg font-semibold text-slate">Thanks — we got it.</h3>
        <p className="mt-1 text-sm text-charcoal/85">
          Expect a response within one business day. If it's urgent, reply to our email with
          "urgent" in the subject.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-4 text-xs font-semibold uppercase tracking-wide text-teal hover:underline"
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-card border border-border bg-surface p-6">
      {heading ? (
        <h2 className="font-heading text-lg font-semibold text-slate">{heading}</h2>
      ) : null}
      <Field label="Your name" id="lead-name" error={errors.name?.message}>
        <Input id="lead-name" autoComplete="name" {...register("name")} />
      </Field>
      <Field label="Email" id="lead-email" error={errors.email?.message}>
        <Input id="lead-email" type="email" autoComplete="email" {...register("email")} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Company" id="lead-company" error={errors.company?.message}>
          <Input id="lead-company" autoComplete="organization" {...register("company")} />
        </Field>
        <Field label="Phone (optional)" id="lead-phone" error={errors.phone?.message}>
          <Input id="lead-phone" type="tel" autoComplete="tel" {...register("phone")} />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Industry" id="lead-industry" error={errors.industry?.message}>
          <Input id="lead-industry" placeholder="e.g. Law firm, Plumbing" {...register("industry")} />
        </Field>
        <Field label="Monthly inbound calls" id="lead-calls" error={errors.monthlyCallVolume?.message}>
          <Input id="lead-calls" placeholder="e.g. 200–500" {...register("monthlyCallVolume")} />
        </Field>
      </div>
      <Field label="What do you need help with?" id="lead-notes" error={errors.notes?.message}>
        <textarea
          id="lead-notes"
          rows={4}
          className="w-full rounded-[var(--radius-input)] border border-border bg-surface px-3 py-2 text-sm text-charcoal focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
          placeholder="Use case, must-have integrations, timeline…"
          {...register("notes")}
        />
      </Field>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-[var(--radius-button)] bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[color:var(--brand-teal-hover)] disabled:opacity-60"
      >
        {isSubmitting ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs font-semibold uppercase tracking-wide text-muted">
        {label}
      </Label>
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
