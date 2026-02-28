import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Coin Shield."
};

export default function PrivacyPage() {
  return (
    <div className="container-shell py-12 sm:py-16">
      <div className="max-w-3xl rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
        <h1 className="text-4xl font-semibold tracking-tight">Privacy Policy</h1>
        <div className="mt-6 space-y-5 text-sm leading-7 text-[var(--muted)]">
          <p>
            Coin Shield collects the information you submit through contact and
            wholesale inquiry forms for the purpose of responding to your
            request, evaluating wholesale fit, and maintaining business
            communication records.
          </p>
          <p>
            We do not sell personal information. We may use service providers
            such as website hosting, analytics, or email delivery tools to
            operate the site and process inquiries.
          </p>
          <p>
            If you want us to update or remove submitted information, contact{" "}
            <a
              href="mailto:hello@coinshieldproducts.com"
              className="font-semibold text-[var(--foreground)]"
            >
              hello@coinshieldproducts.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
