import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Schedule from "@/components/Schedule";
import Videos from "@/components/Videos";
import News from "@/components/News";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Products from "@/components/Products";
import Footer from "@/components/Footer";

import { matches } from "@/data/matches";
import { videoList } from "@/data/videos";
import { newsArticles } from "@/data/news";
import { stats } from "@/data/stats";
import { products } from "@/data/products";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Schedule matches={matches} />
      <Videos videos={videoList} />
      <News articles={newsArticles} />
      <About />
      <Stats stats={stats} />
      <Products products={products} />
      <Footer />
    </main>
  );
}
