import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/data/products";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:-translate-y-1 hover:border-[rgba(184,135,28,0.45)] hover:shadow-[var(--shadow)]">
      <p className="font-[family-name:var(--font-serif)] text-xs uppercase tracking-[0.24em] text-[var(--accent-strong)]">
        Coin Shield Product
      </p>
      <h3 className="mt-3 text-2xl font-semibold tracking-tight">{product.name}</h3>
      <p className="mt-4 flex-1 text-sm leading-7 text-[var(--muted)]">
        {product.shortDescription}
      </p>
      <Link
        href={`/products/${product.slug}`}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--foreground)]"
      >
        View details
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </Link>
    </article>
  );
}
