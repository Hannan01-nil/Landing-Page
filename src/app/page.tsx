import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SportsSection from "@/components/SportsSection";
import Schedule from "@/components/Schedule";
import Stats from "@/components/Stats";
import Players from "@/components/Players";
import Blog from "@/components/Blog";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <SportsSection />
      <Stats />
      <Schedule />
      <Players />
      <Blog />
      <Newsletter />
      <Footer />
    </>
  );
}
