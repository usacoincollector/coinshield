import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for Coin Shield."
};

export default function TermsPage() {
  return (
    <div className="container-shell py-12 sm:py-16">
      <div className="max-w-3xl rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
        <h1 className="text-4xl font-semibold tracking-tight">Terms of Use</h1>
        <div className="mt-6 space-y-5 text-sm leading-7 text-[var(--muted)]">
          <p>
            This website is provided for general informational purposes about
            Coin Shield and its products. Product availability, packaging, and
            specifications may change over time.
          </p>
          <p>
            Submission of a contact or wholesale inquiry does not create a
            reseller agreement, pricing commitment, or supply guarantee. Any
            commercial arrangement is subject to separate review and approval.
          </p>
          <p>
            All website content, branding, and product materials are owned by
            Coin Shield or used with permission. You may not reproduce or reuse
            them without authorization.
          </p>
        </div>
      </div>
    </div>
  );
}
