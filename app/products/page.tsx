import type { Metadata } from "next";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse Coin Shield coin flips, storage boxes, and currency protection products."
};

export default function ProductsPage() {
  return (
    <div className="container-shell py-12 sm:py-16">
      <SectionHeading
        eyebrow="Product Catalog"
        title="Professional storage and protection supplies for coin and currency handling"
        description="This catalog is designed for a straightforward wholesale review flow, with clean specs, use cases, and future-ready datasheet support."
      />
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
