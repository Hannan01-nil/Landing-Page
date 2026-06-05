import type { Metadata } from "next";
import Hero from "@/components/Hero";
import { getHero, getSeo } from "@/app/lib/queries";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeo();
  const entry = seo?.entries?.find((e: { route: string }) => e.route === "/");
  return {
    title: entry?.title || "Khelo - Sports & Recreation Hub",
    description: entry?.description || "Khelo Sporting Club - Your ultimate destination for sports, training, matches, and community.",
    openGraph: { images: [{ url: entry?.ogImage || "/khelo.png" }] },
  };
}

export default async function Home() {
  const hero = await getHero();

  return (
    <div className="-mt-20">
      <Hero
        badge={hero?.badge}
        badgeMobile={hero?.badgeMobile}
        titleFirst={hero?.titleFirst}
        titleMiddle={hero?.titleMiddle}
        titleLast={hero?.titleLast}
        description={hero?.description}
        ctaText={hero?.ctaText}
        ctaLink={hero?.ctaLink}
        image={hero?.image}
      />
    </div>
  );
}
