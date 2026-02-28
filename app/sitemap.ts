import type { MetadataRoute } from "next";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/products",
    "/wholesale",
    "/about",
    "/contact",
    "/privacy",
    "/terms"
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `https://coinshieldproducts.com${route}`,
      lastModified: new Date()
    })),
    ...products.map((product) => ({
      url: `https://coinshieldproducts.com/products/${product.slug}`,
      lastModified: new Date()
    }))
  ];
}
