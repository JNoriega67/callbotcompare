"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trackEvent } from "@/lib/analytics";
import {
  INTENT_LABELS,
  INTENT_VALUES,
  type LeadIntent,
  LeadSchema,
  type LeadInput,
} from "@/lib/leads";

/**
 * One contact form. Visitor picks an intent up top; conditional sections
 * appear underneath. The server derives a routing bucket from the intent
 * so internal triage is automatic — visitors never see "sales" / "support".
 */
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  // Two bot defenses, both invisible to humans:
  //  1. Honeypot: a hidden text field a real user can't see; bots fill every
  //     visible-looking input, so a non-empty value here means automated.
  //  2. Min-time gate: humans take >2s to fill even a short form. Bots
  //     submit instantly. Reject anything that fires <2s after mount.
  const mountedAtRef = useRef<number>(Date.now());
  const honeypotRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LeadInput>({
    resolver: zodResolver(LeadSchema),
    defaultValues: {
      name: "",
      email: "",
      intent: "comparing",
    },
  });

  const intent = (watch("intent") ?? "comparing") as LeadIntent;
  const showBuyer = intent === "comparing" || intent === "implementation";
  const showSupport = intent === "support";

  const onSubmit: SubmitHandler<LeadInput> = async (values) => {
    // Honeypot tripped — pretend success so bots don't probe.
    if (honeypotRef.current?.value) {
      toast.success("Got it — we'll be in touch shortly.");
      reset();
      setSubmitted(true);
      return;
    }
    // Min-time gate.
    if (Date.now() - mountedAtRef.current < 2000) {
      toast.error("That was a little too fast — please try again.");
      return;
    }
    try {
      const response = await fetch(`/api/leads?source=contact`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error ?? "Submission failed");
      }
      trackEvent("lead_submit", { source: "contact", intent: values.intent ?? "comparing" });
      toast.success("Got it — we'll be in touch shortly.");
      reset();
      setSubmitted(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Submission failed");
    }
  };

  if (submitted) {
    return (
      <div className="rounded-[var(--radius-card)] border border-rule bg-signal-soft/50 p-6">
        <h3 className="font-heading text-lg font-semibold text-ink">Thanks — we got it.</h3>
        <p className="mt-2 text-sm text-ink-soft/85">
          We read every submission. Expect a reply within one business day. If it&apos;s urgent and
          you didn&apos;t mark it that way, just reply to our email with &quot;urgent&quot; in the
          subject and we&apos;ll bump it.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-4 text-xs font-semibold text-signal hover:underline"
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-[var(--radius-card)] border border-rule bg-surface p-6 md:p-8"
    >
      {/* Honeypot — hidden from humans (sighted + screen readers). Bots
          submit every input; a non-empty value here means automated. */}
      <div aria-hidden className="pointer-events-none absolute -left-[10000px] h-0 w-0 overflow-hidden">
        <label htmlFor="cf-website">Website</label>
        <input
          ref={honeypotRef}
          id="cf-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          name="website"
        />
      </div>

      {/* Intent — visible selector that gates the rest */}
      <fieldset className="space-y-3">
        <legend className="font-heading text-sm font-semibold text-ink">
          What brings you here?
        </legend>
        <div className="grid gap-2">
          {INTENT_VALUES.map((value) => (
            <label
              key={value}
              className="flex cursor-pointer items-start gap-3 rounded-[var(--radius-button)] border border-rule bg-paper px-4 py-3 transition-colors has-[input:checked]:border-signal has-[input:checked]:bg-signal-soft/40 hover:border-signal/60"
            >
              <input
                type="radio"
                value={value}
                {...register("intent")}
                className="mt-0.5 h-4 w-4 cursor-pointer accent-signal"
              />
              <span className="text-sm text-ink">{INTENT_LABELS[value]}</span>
            </label>
          ))}
        </div>
        {errors.intent ? (
          <p className="text-xs text-destructive">{errors.intent.message}</p>
        ) : null}
      </fieldset>

      {/* Core — always visible */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" id="cf-name" error={errors.name?.message}>
          <Input id="cf-name" autoComplete="name" {...register("name")} />
        </Field>
        <Field label="Work email" id="cf-email" error={errors.email?.message}>
          <Input id="cf-email" type="email" autoComplete="email" {...register("email")} />
        </Field>
        <Field label="Company" id="cf-company" error={errors.company?.message}>
          <Input id="cf-company" autoComplete="organization" {...register("company")} />
        </Field>
        <Field label="Phone (optional)" id="cf-phone" error={errors.phone?.message}>
          <Input id="cf-phone" type="tel" autoComplete="tel" {...register("phone")} />
        </Field>
      </div>

      <Field
        label="What do you need help with?"
        id="cf-mainusecase"
        error={errors.mainUseCase?.message}
      >
        <Input
          id="cf-mainusecase"
          placeholder={
            intent === "support"
              ? "e.g. After-hours calls aren't routing to voicemail"
              : "e.g. Pick the right vendor for our law firm"
          }
          {...register("mainUseCase")}
        />
      </Field>

      <Field
        label="Tell us a little about your situation"
        id="cf-notes"
        error={errors.notes?.message}
      >
        <textarea
          id="cf-notes"
          rows={4}
          className="w-full rounded-[var(--radius-input)] border border-rule bg-surface px-3 py-2 text-sm text-ink focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
          placeholder="Background, constraints, anything we should know before responding."
          {...register("notes")}
        />
      </Field>

      {/* Buyer / implementation conditional block */}
      {showBuyer ? (
        <section className="space-y-4 rounded-[var(--radius-card)] border border-rule bg-paper/60 p-5">
          <p className="font-heading text-xs font-semibold text-signal">
            About your setup
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Business type / industry"
              id="cf-industry"
              error={errors.industry?.message}
            >
              <Input
                id="cf-industry"
                placeholder="e.g. Law firm, HVAC, dental practice"
                {...register("industry")}
              />
            </Field>
            <Field
              label="Estimated monthly call volume"
              id="cf-calls"
              error={errors.monthlyCallVolume?.message}
            >
              <Input
                id="cf-calls"
                placeholder="e.g. 200–500"
                {...register("monthlyCallVolume")}
              />
            </Field>
          </div>
          <Field
            label="Need booking or CRM support?"
            id="cf-integrations"
            error={errors.mustHaveIntegrations?.message}
          >
            <Input
              id="cf-integrations"
              placeholder="e.g. Acuity for booking, HubSpot for CRM"
              {...register("mustHaveIntegrations")}
            />
          </Field>
          <Field label="Timeline" id="cf-timeline" error={errors.timeline?.message}>
            <Input
              id="cf-timeline"
              placeholder="e.g. Want to be live in 30 days"
              {...register("timeline")}
            />
          </Field>
        </section>
      ) : null}

      {/* Support conditional block */}
      {showSupport ? (
        <section className="space-y-4 rounded-[var(--radius-card)] border border-rule bg-paper/60 p-5">
          <p className="font-heading text-xs font-semibold text-signal">About the issue</p>
          <Field
            label="Existing customer or current setup"
            id="cf-currentsetup"
            error={errors.currentPhoneSetup?.message}
          >
            <Input
              id="cf-currentsetup"
              placeholder="e.g. Vendor name + how long you've been using it"
              {...register("currentPhoneSetup")}
            />
          </Field>
          <label className="flex cursor-pointer items-center gap-3 rounded-[var(--radius-button)] border border-rule bg-paper px-4 py-3 transition-colors has-[input:checked]:border-warning has-[input:checked]:bg-[color:var(--warning)]/10">
            <input
              type="checkbox"
              {...register("isUrgent")}
              className="h-4 w-4 cursor-pointer accent-warning"
            />
            <span className="text-sm text-ink">
              This is urgent — calls are dropping or the line is down right now
            </span>
          </label>
        </section>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-[var(--radius-button)] bg-signal px-4 py-3 font-heading text-sm font-semibold text-signal-ink transition-colors hover:bg-signal-hover disabled:opacity-60"
      >
        {isSubmitting ? "Sending…" : "Send"}
      </button>
      <p className="text-xs text-muted-ink">
        We read every submission and reply within one business day.
      </p>
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
      <Label htmlFor={id} className="text-xs font-semibold text-muted-ink">
        {label}
      </Label>
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
