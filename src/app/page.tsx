import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Schedule from "@/components/Schedule";
import Videos from "@/components/Videos";
import News from "@/components/News";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Products from "@/components/Products";
import Footer from "@/components/Footer";

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

async function fetchJSON(url: string) {
  try {
    const res = await fetch(`${BASE}${url}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function Home() {
  const [matches, videos, articles, stats, products, upcomingMatch] = await Promise.all([
    fetchJSON("/api/matches"),
    fetchJSON("/api/videos"),
    fetchJSON("/api/news"),
    fetchJSON("/api/stats"),
    fetchJSON("/api/products"),
    fetchJSON("/api/upcoming-match"),
  ]);

  return (
    <main>
      <Navbar />
      <Hero />
      <Schedule matches={matches || []} upcomingMatch={upcomingMatch} />
      <Videos videos={videos || []} />
      <News articles={articles || []} />
      <About />
      <Stats stats={stats || []} />
      <Products products={products || []} />
      <Footer />
    </main>
  );
}
