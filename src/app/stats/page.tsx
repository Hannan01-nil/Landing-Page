import type { Metadata } from "next";
import Stats from "@/components/Stats";
import { getStats, getSeo } from "@/app/lib/queries";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeo();
  const entry = seo?.entries?.find((e: { route: string }) => e.route === "/stats");
  return {
    title: entry?.title || "Stats - Khelo Sporting Club",
    description: entry?.description || "Club statistics including matches, trainers, players, and awards.",
    openGraph: { images: [{ url: entry?.ogImage || "/khelo.png" }] },
  };
}

export default async function StatsPage() {
  const stats = await getStats();

  return (
    <Stats stats={stats || []} />
  );
}
