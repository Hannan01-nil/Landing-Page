import { connectDB } from "../app/lib/db";
import { Match } from "../app/lib/models/match";
import { UpcomingMatch } from "../app/lib/models/upcomingMatch";
import { Video } from "../app/lib/models/video";
import { FeaturedVideo } from "../app/lib/models/featuredVideo";
import { NewsArticle } from "../app/lib/models/newsArticle";
import { Stat } from "../app/lib/models/stat";
import { Product } from "../app/lib/models/product";
import { Hero } from "../app/lib/models/hero";
import { About } from "../app/lib/models/about";
import { MatchSection } from "../app/lib/models/matchSection";
import { HighlightSection } from "../app/lib/models/highlightSection";
import { NewsSection } from "../app/lib/models/newsSection";
import { ProductSection } from "../app/lib/models/productSection";
import { SubscribeSection } from "../app/lib/models/subscribeSection";
import { Admin } from "../app/lib/models/admin";
import bcrypt from "bcryptjs";

async function seed() {
  await connectDB();
  console.log("Connected to MongoDB.\n");

  // Seed admin
  const adminEmail = process.env.ADMIN_EMAIL || "admin@123";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  const existingAdmin = await Admin.findOne({ email: adminEmail });
  if (existingAdmin) {
    const hashed = await bcrypt.hash(adminPassword, 12);
    existingAdmin.password = hashed;
    await existingAdmin.save();
    console.log("✓ Admin password updated");
  } else {
    const hashed = await bcrypt.hash(adminPassword, 12);
    await Admin.create({ email: adminEmail, password: hashed });
    console.log(`✓ Admin created: ${adminEmail} / ${adminPassword}`);
  }

  // Seed matches
  if ((await Match.countDocuments()) === 0) {
    await Match.insertMany([
      { league: "UEFA Champions League", date: "May 12, 2024", homeTeam: "Real Madrid", awayTeam: "Liverpool", score: "3-4", sport: "football" },
      { league: "IPL T20 Championship", date: "April 15, 2024", homeTeam: "Mumbai Indians", awayTeam: "Chennai Super Kings", score: "187-4", sport: "cricket" },
      { league: "NBA Finals", date: "June 08, 2024", homeTeam: "LA Lakers", awayTeam: "Boston Celtics", score: "112-98", sport: "basketball" },
      { league: "Wimbledon Open", date: "July 14, 2024", homeTeam: "C. Alcaraz", awayTeam: "N. Djokovic", score: "3-2", sport: "tennis" },
    ]);
    console.log("✓ Seeded 4 matches");
  } else {
    console.log("• Matches already exist");
  }

  // Seed upcoming match
  if ((await UpcomingMatch.countDocuments()) === 0) {
    await UpcomingMatch.create({ league: "Valencia VS Real Sociedad", days: 138, hours: 6, minutes: 52, seconds: 46 });
    console.log("✓ Seeded upcoming match");
  } else {
    console.log("• Upcoming match already exists");
  }

  // Seed videos
  if ((await Video.countDocuments()) === 0) {
    await Video.insertMany([
      { title: "Match Highlights: Liverpool 2-1 Everton | The FA Cup", publishedDate: "Jan 12, 2024", duration: "2:35 Mins", thumbnail: "/images/blog-1.jpg" },
      { title: "Match Highlights: Real Madrid 4-2 M City | The FA Cup", publishedDate: "May 12, 2024", duration: "2:35 Mins", thumbnail: "/images/blog-2.jpg" },
      { title: "Match Highlights: Albion 3-2 Liver Pool", publishedDate: "Apr 14, 2024", duration: "2:35 Mins", thumbnail: "/images/blog-3.jpg" },
    ]);
    console.log("✓ Seeded 3 videos");
  } else {
    console.log("• Videos already exist");
  }

  // Seed featured video
  if ((await FeaturedVideo.countDocuments()) === 0) {
    await FeaturedVideo.create({ image: "/images/blog-1.jpg", alt: "Highlighted match" });
    console.log("✓ Seeded featured video");
  } else {
    console.log("• Featured video already exists");
  }

  // Seed news articles
  if ((await NewsArticle.countDocuments()) === 0) {
    await NewsArticle.insertMany([
      { title: "Latest point table for the Premier League", image: "/images/blog-1.jpg", date: "May 25, 2019" },
      { title: "City tops Chelsea in Community Shield here", image: "/images/blog-2.jpg", date: "May 25, 2019" },
      { title: "Ground round meatball starts right here", image: "/images/blog-3.jpg", date: "May 25, 2019" },
    ]);
    console.log("✓ Seeded 3 news articles");
  } else {
    console.log("• News articles already exist");
  }

  // Seed stats
  if ((await Stat.countDocuments()) === 0) {
    await Stat.insertMany([
      { value: "350+", label: "Total Matches", description: "We are playing from now total 355 matches." },
      { value: "25+", label: "Total Trainers", description: "In our community there are 27 top skill trainers." },
      { value: "95+", label: "Total Players", description: "Total 98 best players available in our club." },
      { value: "25+", label: "Total Awards", description: "We have achieved 27 winner awards." },
    ]);
    console.log("✓ Seeded 4 stats");
  } else {
    console.log("• Stats already exist");
  }

  // Seed products
  if ((await Product.countDocuments()) === 0) {
    await Product.insertMany([
      { name: "Spots back cap", price: "$65.00", image: "/images/player-1.jpg" },
      { name: "All your unique sporting t-shirts", image: "/images/cricket.jpg", wide: true },
      { name: "Breathable running shoe", price: "$220.00", image: "/images/tennis.jpg" },
    ]);
    console.log("✓ Seeded 3 products");
  } else {
    console.log("• Products already exist");
  }

  // Seed hero section
  await Hero.findOneAndUpdate({}, {
    badge: "Introducing\nKhelo\nSporting",
    badgeMobile: "Introducing Khelo Sporting",
    titleFirst: "S",
    titleMiddle: "portin",
    titleLast: "g",
    description: "We vehemently condemn and disapprove of individuals who are swayed and demoralized by the allure of momentary pleasures.",
    ctaText: "Book A Ticket",
    ctaLink: "#matches",
    image: "/images/football.jpg",
  }, { upsert: true });
  console.log("✓ Seeded hero section");

  // Seed about section
  await About.findOneAndUpdate({}, {
    badge: "⊕ About Us",
    title: "Who we are",
    description: "Khelo Sporting Club is a premier multi-sport community dedicated to fostering athletic excellence, teamwork, and a lifelong passion for sports. From football and cricket to basketball and tennis, we provide world-class facilities, expert coaching, and a vibrant community of athletes at every level.",
    image: "/images/football.jpg",
    ctaText: "Read More",
    ctaLink: "#products",
  }, { upsert: true });
  console.log("✓ Seeded about section");

  // Seed section settings
  await MatchSection.findOneAndUpdate({}, { title: "Khelo sporting info\nand updates" }, { upsert: true });
  console.log("✓ Seeded match section");

  await HighlightSection.findOneAndUpdate({}, {
    title: "Highlighted Match",
    description: "An exciting match with top teams, thrilling action, and unforgettable moments.",
    featuredImage: "/images/blog-1.jpg",
    featuredAlt: "Highlighted match",
  }, { upsert: true });
  console.log("✓ Seeded highlight section");

  await NewsSection.findOneAndUpdate({}, { title: "Latest News", ctaText: "See All News", ctaLink: "#about" }, { upsert: true });
  console.log("✓ Seeded news section");

  await ProductSection.findOneAndUpdate({}, {
    title: "Top products\n✳ in our listing",
    description: "Explore our top products, meticulously selected for their quality and innovation. Each item promises exceptional value and performance.",
    ctaText: "Explore All",
    ctaLink: "#subscribe",
  }, { upsert: true });
  console.log("✓ Seeded product section");

  await SubscribeSection.findOneAndUpdate({}, { title: "Subscribe to our newsletter", placeholder: "Enter your email", buttonText: "Subscribe" }, { upsert: true });
  console.log("✓ Seeded subscribe section");

  console.log("\n✅ Seed complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
