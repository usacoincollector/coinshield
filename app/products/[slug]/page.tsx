import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Download, PackageCheck } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { SpecsTable } from "@/components/specs-table";
import { getProductBySlug, products } from "@/data/products";
import { getDatasheetPath } from "@/lib/datasheets";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug
  }));
}

export async function generateMetadata({
  params
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found"
    };
  }

  return {
    title: product.name,
    description: product.positioning
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const datasheetPath = getDatasheetPath(product.slug);
  const hasDatasheet = Boolean(datasheetPath);

  return (
    <div className="container-shell py-12 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="space-y-8">
          <div className="space-y-4">
            <p className="font-[family-name:var(--font-serif)] text-sm uppercase tracking-[0.3em] text-[var(--accent-strong)]">
              Product Detail
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              {product.name}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-[var(--muted)]">
              {product.positioning}
            </p>
          </div>

          <div className="grid gap-6 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
            <SectionHeading
              eyebrow="Features & Benefits"
              title="Designed for everyday handling, inventory control, and long-term presentation"
            />
            <ul className="grid gap-4 sm:grid-cols-2">
              {product.features.map((feature) => (
                <li
                  key={feature}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-4 text-sm leading-7 text-[var(--foreground)]"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-6 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
            <SectionHeading
              eyebrow="Use Cases"
              title="Common fit for dealers, fulfillment teams, and collector supply programs"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {product.useCases.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[var(--border)] p-4 text-sm leading-7 text-[var(--muted)]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
            <SectionHeading
              eyebrow="Packaging Options"
              title="Flexible options for wholesale planning"
            />
            <ul className="grid gap-3 text-sm leading-7 text-[var(--muted)]">
              {product.packagingOptions.map((option) => (
                <li
                  key={option}
                  className="rounded-2xl border border-[var(--border)] px-4 py-3"
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-full bg-[rgba(184,135,28,0.12)] p-3 text-[var(--accent-strong)]">
                <PackageCheck className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Key Specs</h2>
                <p className="text-sm text-[var(--muted)]">
                  Quick-reference product detail
                </p>
              </div>
            </div>
            <SpecsTable specs={product.specs} />
          </div>

          <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
            <h2 className="text-xl font-semibold">Data Sheet</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
              Download the latest product PDF when available. Place future files
              in <code>/public/datasheets/</code> using the product slug as the
              filename.
            </p>
            <div className="mt-5">
              {datasheetPath ? (
                <Link
                  href={datasheetPath}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d141b]"
                >
                  <Download className="h-4 w-4" />
                  Download Data Sheet
                </Link>
              ) : (
                <span
                  aria-disabled="true"
                  className="disabled-link inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-5 py-3 text-sm font-semibold"
                >
                  <Download className="h-4 w-4" />
                  Data sheet coming soon
                </span>
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface-soft)] p-6 sm:p-8">
            <h2 className="text-xl font-semibold">Request Wholesale Pricing</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
              Send your expected volume and product mix so we can review fit,
              packaging, and fulfillment support.
            </p>
            <Link
              href="/wholesale"
              className="mt-5 inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)]"
            >
              Start Wholesale Inquiry
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
