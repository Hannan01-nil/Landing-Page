import type { Metadata } from "next";
import Schedule from "@/components/Schedule";
import { getMatches, getUpcomingMatch, getMatchSection, getSeo } from "@/app/lib/queries";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeo();
  const entry = seo?.entries?.find((e: { route: string }) => e.route === "/matches");
  return {
    title: entry?.title || "Matches - Khelo Sporting Club",
    description: entry?.description || "View upcoming and recent matches at Khelo Sporting Club.",
    openGraph: { images: [{ url: entry?.ogImage || "/khelo.png" }] },
  };
}

export default async function MatchesPage() {
  const [matches, upcomingMatch, matchSection] = await Promise.all([
    getMatches(),
    getUpcomingMatch(),
    getMatchSection(),
  ]);

  return (
    <Schedule
      matches={matches || []}
      upcomingMatch={upcomingMatch}
      sectionTitle={matchSection?.title}
    />
  );
}
