import type { Metadata } from "next";
import About from "@/components/About";
import { getAbout, getSeo } from "@/app/lib/queries";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeo();
  const entry = seo?.entries?.find((e: { route: string }) => e.route === "/about");
  return {
    title: entry?.title || "About - Khelo Sporting Club",
    description: entry?.description || "Learn about Khelo Sporting Club - our mission, values, and community.",
    openGraph: { images: [{ url: entry?.ogImage || "/khelo.png" }] },
  };
}

export default async function AboutPage() {
  const about = await getAbout();

  return (
    <About
      badge={about?.badge}
      title={about?.title}
      description={about?.description}
      image={about?.image}
      ctaText={about?.ctaText}
      ctaLink={about?.ctaLink}
    />
  );
}
