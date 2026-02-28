import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Coin Shield's focus on precision, quality consistency, and collector-first product design."
};

export default function AboutPage() {
  return (
    <div className="container-shell py-12 sm:py-16">
      <div className="grid gap-8">
        <SectionHeading
          eyebrow="About Coin Shield"
          title="A manufacturer brand focused on presentation, consistency, and collector-first design"
          description="Coin Shield is built to serve businesses and collectors who value dependable product fit, clean presentation, and straightforward supply."
        />

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">Brand story</h2>
            <p className="mt-4 text-base leading-8 text-[var(--muted)]">
              Coin Shield was created around a practical idea: storage and
              protection supplies should feel consistent from shipment to
              shipment, present well in front of collectors, and support
              long-term handling with confidence. The brand direction emphasizes
              precision, quality focus, and dependable execution instead of
              unnecessary complexity.
            </p>
          </div>
          <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface-soft)] p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">Quality promise</h2>
            <p className="mt-4 text-base leading-8 text-[var(--muted)]">
              Our product line is developed around repeatable manufacturing,
              practical packaging, and inspection-minded presentation. That
              means clearer windows, cleaner edges, more predictable dimensions,
              and materials chosen for storage-minded applications where product
              consistency matters.
            </p>
          </div>
        </section>

        <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
          <h2 className="text-2xl font-semibold">Materials and compliance notes</h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-[var(--muted)]">
            Product-specific material details are listed on each product page.
            Where a product has a defined material statement, it is reflected in
            the key specs. For product lines that may evolve, Coin Shield keeps
            material claims conservative and documentation-based so buyers can
            evaluate products with clear, supportable information.
          </p>
        </section>
      </div>
    </div>
  );
}
