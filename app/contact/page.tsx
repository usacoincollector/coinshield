import type { Metadata } from "next";
import Link from "next/link";
import { InquiryForm } from "@/components/inquiry-form";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Coin Shield for general questions and wholesale follow-up.",
  openGraph: {
    title: "Contact Coin Shield",
    description:
      "Contact Coin Shield for general questions and wholesale follow-up.",
    url: "https://www.coinshieldproducts.com/contact"
  },
  twitter: {
    title: "Contact Coin Shield",
    description:
      "Contact Coin Shield for general questions and wholesale follow-up."
  }
};

export default function ContactPage() {
  return (
    <div className="container-shell py-12 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <section className="space-y-6">
          <SectionHeading
            as="h1"
            eyebrow="Contact"
            title="General questions, product follow-up, and wholesale coordination"
            description="For quick contact, email the Coin Shield team directly or use the form below."
          />
          <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface-soft)] p-6 sm:p-8">
            <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">
              Email
            </p>
            <Link
              href="mailto:hello@coinshieldproducts.com"
              className="mt-3 inline-block text-xl font-semibold hover:text-[var(--accent-strong)]"
            >
              hello@coinshieldproducts.com
            </Link>
          </div>
        </section>

        <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
          <InquiryForm variant="contact" />
        </section>
      </div>
    </div>
  );
}
