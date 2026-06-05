import type { Metadata } from "next";
import News from "@/components/News";
import { getNews, getNewsSection, getSeo } from "@/app/lib/queries";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeo();
  const entry = seo?.entries?.find((e: { route: string }) => e.route === "/news");
  return {
    title: entry?.title || "News - Khelo Sporting Club",
    description: entry?.description || "Latest news and updates from Khelo Sporting Club.",
    openGraph: { images: [{ url: entry?.ogImage || "/khelo.png" }] },
  };
}

export default async function NewsPage() {
  const [articles, newsSection] = await Promise.all([
    getNews(),
    getNewsSection(),
  ]);

  return (
    <News
      articles={articles || []}
      sectionTitle={newsSection?.title}
      ctaText={newsSection?.ctaText}
      ctaLink={newsSection?.ctaLink}
    />
  );
}
