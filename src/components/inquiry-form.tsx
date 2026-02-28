"use client";

import { useState } from "react";
import { products } from "@/data/products";

type InquiryFormProps = {
  variant: "wholesale" | "contact";
};

type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

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

      const result = (await response.json()) as { message?: string; success: boolean };

      if (!response.ok || !result.success) {
        throw new Error(result.message ?? "Something went wrong.");
      }

      setFormState({
        status: "success",
        message: result.message
      });

      const form = document.getElementById(`${variant}-form`) as HTMLFormElement | null;
      form?.reset();
    } catch (error) {
      setFormState({
        status: "error",
        message:
          error instanceof Error ? error.message : "Unable to submit the form."
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
              className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)]"
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
              className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)]"
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
              className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)]"
            />
          </Field>
          <Field label="Phone (optional)" htmlFor={`${variant}-phone`}>
            <input
              id={`${variant}-phone`}
              name="phone"
              type="tel"
              className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)]"
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
            className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)]"
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
                className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)]"
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
            </fieldset>
          </>
        ) : null}

        <Field label="Message" htmlFor={`${variant}-message`} required>
          <textarea
            id={`${variant}-message`}
            name="message"
            required
            rows={6}
            className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)]"
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
