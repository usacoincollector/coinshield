import type { Metadata } from "next";
import { InquiryForm } from "@/components/inquiry-form";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Wholesale Inquiries",
  description:
    "Submit a wholesale inquiry for Coin Shield products, including estimated monthly volume and product interest.",
  openGraph: {
    title: "Wholesale Inquiries",
    description:
      "Submit a wholesale inquiry for Coin Shield products, including estimated monthly volume and product interest.",
    url: "https://www.coinshieldproducts.com/wholesale"
  },
  twitter: {
    title: "Wholesale Inquiries",
    description:
      "Submit a wholesale inquiry for Coin Shield products, including estimated monthly volume and product interest."
  }
};

export default function WholesalePage() {
  return (
    <div className="container-shell py-12 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="space-y-6">
          <SectionHeading
            as="h1"
            eyebrow="Wholesale Program"
            title="Built for dealers, distributors, and serious marketplace operators"
            description="Coin Shield supports wholesale conversations focused on consistent quality, practical packaging, and straightforward fulfillment."
          />
          <div className="space-y-4 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
            <h2 className="text-xl font-semibold">What to include</h2>
            <ul className="grid gap-3 text-sm leading-7 text-[var(--muted)]">
              <li>Estimated monthly volume and the products you are evaluating.</li>
              <li>Your company, storefront, or marketplace presence if applicable.</li>
              <li>Any questions about packaging, lead times, or product fit.</li>
            </ul>
          </div>
          <div className="space-y-4 rounded-[2rem] border border-[var(--border)] bg-[var(--surface-soft)] p-6 sm:p-8">
            <h2 className="text-xl font-semibold">Review process</h2>
            <p className="text-sm leading-7 text-[var(--muted)]">
              Each inquiry is reviewed manually so we can respond with the right
              product mix, packaging guidance, and next-step information for
              your business.
            </p>
          </div>
        </section>

        <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
          <InquiryForm variant="wholesale" />
        </section>
      </div>
    </div>
  );
}
