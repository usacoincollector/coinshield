"use client";

import { useState } from "react";
import { products } from "@/data/products";

type InquiryFormProps = {
  variant: "wholesale" | "contact";
};

type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<FormFieldName, string>>;
};

type FormFieldName =
  | "fullName"
  | "companyName"
  | "email"
  | "phone"
  | "website"
  | "monthlyVolume"
  | "productsInterested"
  | "message";

const volumeOptions = [
  "Under 100 units",
  "100-500 units",
  "500-1,000 units",
  "1,000-5,000 units",
  "5,000+ units"
];

export function InquiryForm({ variant }: InquiryFormProps) {
  const [formState, setFormState] = useState<FormState>({ status: "idle" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setFormState({ status: "idle" });

    const payload = {
      formType: variant,
      fullName: String(formData.get("fullName") ?? ""),
      companyName: String(formData.get("companyName") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      website: String(formData.get("website") ?? ""),
      monthlyVolume: String(formData.get("monthlyVolume") ?? ""),
      productsInterested: formData.getAll("productsInterested").map(String),
      message: String(formData.get("message") ?? ""),
      companyWebsite: String(formData.get("companyWebsite") ?? "")
    };

    try {
      const response = await fetch("/api/wholesale-inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = (await response.json()) as {
        message?: string;
        success: boolean;
        errors?: Record<string, string[] | undefined>;
      };

      if (!response.ok || !result.success) {
        const fieldErrors = normalizeFieldErrors(result.errors);
        setFormState({
          status: "error",
          message: result.message ?? "Something went wrong.",
          fieldErrors
        });
        return;
      }

      setFormState({
        status: "success",
        message: result.message,
        fieldErrors: {}
      });

      const form = document.getElementById(`${variant}-form`) as HTMLFormElement | null;
      form?.reset();
    } catch (error) {
      setFormState({
        status: "error",
        message:
          error instanceof Error ? error.message : "Unable to submit the form.",
        fieldErrors: {}
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold">
        {variant === "wholesale" ? "Wholesale inquiry form" : "Contact form"}
      </h2>
      <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
        {variant === "wholesale"
          ? "Tell us about your business and product interest."
          : "Send a general question or follow-up message."}
      </p>

      <form
        id={`${variant}-form`}
        action={handleSubmit}
        className="mt-8 grid gap-5"
      >
        <div className="hidden" aria-hidden="true">
          <label htmlFor={`${variant}-companyWebsite`}>Leave this field blank</label>
          <input
            id={`${variant}-companyWebsite`}
            name="companyWebsite"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Full Name" htmlFor={`${variant}-fullName`} required>
            <input
              id={`${variant}-fullName`}
              name="fullName"
              type="text"
              required
              aria-invalid={Boolean(formState.fieldErrors?.fullName)}
              aria-describedby={
                formState.fieldErrors?.fullName
                  ? `${variant}-fullName-error`
                  : undefined
              }
              className={getInputClassName(Boolean(formState.fieldErrors?.fullName))}
            />
            <FieldError
              id={`${variant}-fullName-error`}
              message={formState.fieldErrors?.fullName}
            />
          </Field>
          <Field
            label="Company Name"
            htmlFor={`${variant}-companyName`}
            required={variant === "wholesale"}
          >
            <input
              id={`${variant}-companyName`}
              name="companyName"
              type="text"
              required={variant === "wholesale"}
              aria-invalid={Boolean(formState.fieldErrors?.companyName)}
              aria-describedby={
                formState.fieldErrors?.companyName
                  ? `${variant}-companyName-error`
                  : undefined
              }
              className={getInputClassName(Boolean(formState.fieldErrors?.companyName))}
            />
            <FieldError
              id={`${variant}-companyName-error`}
              message={formState.fieldErrors?.companyName}
            />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Email" htmlFor={`${variant}-email`} required>
            <input
              id={`${variant}-email`}
              name="email"
              type="email"
              required
              aria-invalid={Boolean(formState.fieldErrors?.email)}
              aria-describedby={
                formState.fieldErrors?.email ? `${variant}-email-error` : undefined
              }
              className={getInputClassName(Boolean(formState.fieldErrors?.email))}
            />
            <FieldError
              id={`${variant}-email-error`}
              message={formState.fieldErrors?.email}
            />
          </Field>
          <Field label="Phone (optional)" htmlFor={`${variant}-phone`}>
            <input
              id={`${variant}-phone`}
              name="phone"
              type="tel"
              aria-invalid={Boolean(formState.fieldErrors?.phone)}
              aria-describedby={
                formState.fieldErrors?.phone ? `${variant}-phone-error` : undefined
              }
              className={getInputClassName(Boolean(formState.fieldErrors?.phone))}
            />
            <FieldError
              id={`${variant}-phone-error`}
              message={formState.fieldErrors?.phone}
            />
          </Field>
        </div>

        <Field
          label="Website / Marketplace profile (optional)"
          htmlFor={`${variant}-website`}
        >
          <input
            id={`${variant}-website`}
            name="website"
            type="url"
            placeholder="https://"
            aria-invalid={Boolean(formState.fieldErrors?.website)}
            aria-describedby={
              formState.fieldErrors?.website ? `${variant}-website-error` : undefined
            }
            className={getInputClassName(Boolean(formState.fieldErrors?.website))}
          />
          <FieldError
            id={`${variant}-website-error`}
            message={formState.fieldErrors?.website}
          />
        </Field>

        {variant === "wholesale" ? (
          <>
            <Field label="Estimated monthly volume" htmlFor={`${variant}-monthlyVolume`} required>
              <select
                id={`${variant}-monthlyVolume`}
                name="monthlyVolume"
                required
                defaultValue=""
                aria-invalid={Boolean(formState.fieldErrors?.monthlyVolume)}
                aria-describedby={
                  formState.fieldErrors?.monthlyVolume
                    ? `${variant}-monthlyVolume-error`
                    : undefined
                }
                className={getInputClassName(
                  Boolean(formState.fieldErrors?.monthlyVolume)
                )}
              >
                <option value="" disabled>
                  Select volume
                </option>
                {volumeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <FieldError
                id={`${variant}-monthlyVolume-error`}
                message={formState.fieldErrors?.monthlyVolume}
              />
            </Field>

            <fieldset className="grid gap-3">
              <legend className="text-sm font-semibold text-[var(--foreground)]">
                Products interested in
              </legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {products.map((product) => (
                  <label
                    key={product.slug}
                    className="flex items-start gap-3 rounded-2xl border border-[var(--border)] px-4 py-3 text-sm text-[var(--muted)]"
                  >
                    <input
                      type="checkbox"
                      name="productsInterested"
                      value={product.name}
                      className="mt-1 h-4 w-4 accent-[var(--accent)]"
                    />
                    <span>{product.name}</span>
                  </label>
                ))}
              </div>
              <FieldError
                id={`${variant}-productsInterested-error`}
                message={formState.fieldErrors?.productsInterested}
              />
            </fieldset>
          </>
        ) : null}

        <Field label="Message" htmlFor={`${variant}-message`} required>
          <textarea
            id={`${variant}-message`}
            name="message"
            required
            rows={6}
            aria-invalid={Boolean(formState.fieldErrors?.message)}
            aria-describedby={
              formState.fieldErrors?.message ? `${variant}-message-error` : undefined
            }
            className={getInputClassName(Boolean(formState.fieldErrors?.message))}
          />
          <FieldError
            id={`${variant}-message-error`}
            message={formState.fieldErrors?.message}
          />
        </Field>

        {formState.status !== "idle" ? (
          <div
            className={`rounded-2xl px-4 py-3 text-sm ${
              formState.status === "success"
                ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {formState.message}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-full bg-[var(--foreground)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d141b] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Submitting..." : variant === "wholesale" ? "Submit inquiry" : "Send message"}
        </button>
      </form>
    </div>
  );
}

type FieldProps = {
  children: React.ReactNode;
  htmlFor: string;
  label: string;
  required?: boolean;
};

function Field({ children, htmlFor, label, required = false }: FieldProps) {
  return (
    <label htmlFor={htmlFor} className="grid gap-2">
      <span className="text-sm font-semibold text-[var(--foreground)]">
        {label}
        {required ? " *" : ""}
      </span>
      {children}
    </label>
  );
}

type FieldErrorProps = {
  id: string;
  message?: string;
};

function FieldError({ id, message }: FieldErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <span id={id} className="text-sm text-red-700">
      {message}
    </span>
  );
}

function getInputClassName(hasError: boolean) {
  return `w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition ${
    hasError
      ? "border-red-300 focus:border-red-500"
      : "border-[var(--border)] focus:border-[var(--accent)]"
  }`;
}

function normalizeFieldErrors(errors?: Record<string, string[] | undefined>) {
  if (!errors) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(errors)
      .filter(([, value]) => Array.isArray(value) && value.length > 0)
      .map(([key, value]) => [key, value?.[0] ?? "Invalid value."])
  ) as Partial<Record<FormFieldName, string>>;
}
