import type { Metadata } from "next";
import Videos from "@/components/Videos";
import { getVideos, getHighlightSection, getSeo } from "@/app/lib/queries";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeo();
  const entry = seo?.entries?.find((e: { route: string }) => e.route === "/videos");
  return {
    title: entry?.title || "Highlights - Khelo Sporting Club",
    description: entry?.description || "Watch match highlights and featured videos from Khelo Sporting Club.",
    openGraph: { images: [{ url: entry?.ogImage || "/khelo.png" }] },
  };
}

export default async function VideosPage() {
  const [videos, highlightSection] = await Promise.all([
    getVideos(),
    getHighlightSection(),
  ]);

  return (
    <Videos
      videos={videos || []}
      sectionTitle={highlightSection?.title}
      sectionDescription={highlightSection?.description}
      featuredImage={highlightSection?.featuredImage}
      featuredAlt={highlightSection?.featuredAlt}
    />
  );
}
