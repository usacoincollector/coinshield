import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  ShieldCheck,
  Truck
} from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { featuredProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "Premium Coin Storage & Protection Supplies",
  description:
    "Professional manufacturer site for Coin Shield coin flips, currency toploaders, and storage boxes."
};

const trustPoints = [
  {
    title: "Archival-safe materials",
    icon: ShieldCheck
  },
  {
    title: "Consistent manufacturing",
    icon: BadgeCheck
  },
  {
    title: "Fast fulfillment support",
    icon: Truck
  }
];

export default function HomePage() {
  return (
    <div className="pb-20">
      <section className="container-shell py-8 sm:py-12 lg:py-16">
        <div className="card-surface overflow-hidden rounded-[2rem] border border-[var(--border)] px-6 py-10 sm:px-10 lg:px-14 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(184,135,28,0.24)] bg-[rgba(184,135,28,0.08)] px-4 py-2 text-sm font-semibold text-[var(--accent-strong)]">
                <Boxes className="h-4 w-4" />
                Manufacturer website for wholesale and product documentation
              </div>
              <div className="space-y-4">
                <p className="font-[family-name:var(--font-serif)] text-sm uppercase tracking-[0.32em] text-[var(--muted)]">
                  Coin Shield
                </p>
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                  Coin Shield - Premium Coin Storage &amp; Protection Supplies
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
                  Archival-safe, collector-trusted supplies for long-term
                  preservation.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/wholesale"
                  className="inline-flex items-center justify-center rounded-full bg-[var(--foreground)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d141b]"
                >
                  Wholesale Inquiries
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-white px-6 py-3 text-sm font-semibold transition hover:border-[var(--accent)] hover:text-[var(--accent-strong)]"
                >
                  View Products
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              {trustPoints.map(({ title, icon: Icon }) => (
                <div
                  key={title}
                  className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-5"
                >
                  <div className="mb-3 inline-flex rounded-full bg-[rgba(184,135,28,0.12)] p-3 text-[var(--accent-strong)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-lg font-semibold">{title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-8 sm:py-10">
        <SectionHeading
          eyebrow="Featured Products"
          title="Built for dealers, distributors, and collector-focused resale channels"
          description="Each product page is powered from a single data source so updates stay simple as the catalog grows."
        />
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="container-shell py-8 sm:py-10">
        <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface-soft)] px-6 py-8 sm:px-8 lg:flex lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="font-[family-name:var(--font-serif)] text-sm uppercase tracking-[0.3em] text-[var(--accent-strong)]">
              Where to Buy
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Retail channels for collectors who need Coin Shield products today
            </h2>
            <p className="mt-3 text-base leading-7 text-[var(--muted)]">
              Wholesale and distributor inquiries should go through our inquiry
              team. Retail customers can find current listings through our
              marketplace storefronts.
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0">
            <Link
              href="https://www.ebay.com/str/usacoincollector"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-white px-5 py-3 text-sm font-semibold transition hover:border-[var(--accent)]"
            >
              Shop on eBay
            </Link>
            <Link
              href="https://www.amazon.com/stores/CoinShield/page/0AE6DA3C-2BAC-46D4-9034-E5418FE7E8B6?lp_asin=B0FKMCCT49&ref_=ast_bln"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)]"
            >
              Shop on Amazon
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
