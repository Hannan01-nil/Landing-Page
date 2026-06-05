import type { Metadata } from "next";
import Products from "@/components/Products";
import { getProducts, getProductSection, getSeo } from "@/app/lib/queries";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeo();
  const entry = seo?.entries?.find((e: { route: string }) => e.route === "/products");
  return {
    title: entry?.title || "Products - Khelo Sporting Club",
    description: entry?.description || "Browse sports products and merchandise from Khelo Sporting Club.",
    openGraph: { images: [{ url: entry?.ogImage || "/khelo.png" }] },
  };
}

export default async function ProductsPage() {
  const [products, productSection] = await Promise.all([
    getProducts(),
    getProductSection(),
  ]);

  return (
    <Products
      products={products || []}
      sectionTitle={productSection?.title}
      sectionDescription={productSection?.description}
      ctaText={productSection?.ctaText}
      ctaLink={productSection?.ctaLink}
    />
  );
}
