import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Schedule from "@/components/Schedule";
import Videos from "@/components/Videos";
import News from "@/components/News";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Products from "@/components/Products";
import Footer from "@/components/Footer";
import { getMatches, getUpcomingMatch, getVideos, getNews, getStats, getProducts, getHero, getAbout, getMatchSection, getHighlightSection, getNewsSection, getProductSection, getSubscribeSection } from "@/app/lib/queries";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [matches, videos, articles, stats, products, upcomingMatch, hero, about, matchSection, highlightSection, newsSection, productSection, subscribeSection] = await Promise.all([
    getMatches(),
    getVideos(),
    getNews(),
    getStats(),
    getProducts(),
    getUpcomingMatch(),
    getHero(),
    getAbout(),
    getMatchSection(),
    getHighlightSection(),
    getNewsSection(),
    getProductSection(),
    getSubscribeSection(),
  ]);

  return (
    <main>
      <Navbar />
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
      <Schedule matches={matches || []} upcomingMatch={upcomingMatch} sectionTitle={matchSection?.title} />
      <Videos videos={videos || []} sectionTitle={highlightSection?.title} sectionDescription={highlightSection?.description} featuredImage={highlightSection?.featuredImage} featuredAlt={highlightSection?.featuredAlt} />
      <News articles={articles || []} sectionTitle={newsSection?.title} ctaText={newsSection?.ctaText} ctaLink={newsSection?.ctaLink} />
      <About badge={about?.badge} title={about?.title} description={about?.description} image={about?.image} ctaText={about?.ctaText} ctaLink={about?.ctaLink} />
      <Stats stats={stats || []} />
      <Products products={products || []} sectionTitle={productSection?.title} sectionDescription={productSection?.description} ctaText={productSection?.ctaText} ctaLink={productSection?.ctaLink} />
      <Footer subscribeTitle={subscribeSection?.title} subscribePlaceholder={subscribeSection?.placeholder} subscribeButtonText={subscribeSection?.buttonText} />
    </main>
  );
}
