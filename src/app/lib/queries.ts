import { connectDB } from "./db";
import { Match } from "./models/match";
import { UpcomingMatch } from "./models/upcomingMatch";
import { Video } from "./models/video";
import { NewsArticle } from "./models/newsArticle";
import { Stat } from "./models/stat";
import { Product } from "./models/product";
import { Hero } from "./models/hero";
import { About } from "./models/about";
import { MatchSection } from "./models/matchSection";
import { HighlightSection } from "./models/highlightSection";
import { NewsSection } from "./models/newsSection";
import { ProductSection } from "./models/productSection";
import { SubscribeSection } from "./models/subscribeSection";

export async function getMatches() {
  await connectDB();
  return Match.find().lean();
}

export async function getUpcomingMatch() {
  await connectDB();
  return UpcomingMatch.findOne().sort({ createdAt: -1 }).lean();
}

export async function getVideos() {
  await connectDB();
  return Video.find().lean();
}

export async function getNews() {
  await connectDB();
  return NewsArticle.find().lean();
}

export async function getStats() {
  await connectDB();
  return Stat.find().lean();
}

export async function getProducts() {
  await connectDB();
  return Product.find().lean();
}

export async function getHero() {
  await connectDB();
  const data = await Hero.findOne().sort({ createdAt: -1 }).lean();
  return data || { badge: "Introducing\nKhelo\nSporting", badgeMobile: "Introducing Khelo Sporting", titleFirst: "S", titleMiddle: "portin", titleLast: "g", description: "We vehemently condemn and disapprove of individuals who are swayed and demoralized by the allure of momentary pleasures.", ctaText: "Book A Ticket", ctaLink: "#matches", image: "/images/football.jpg" };
}

export async function getAbout() {
  await connectDB();
  const data = await About.findOne().sort({ createdAt: -1 }).lean();
  return data || { badge: "⊕ About Us", title: "Who we are", description: "Khelo Sporting Club is a premier multi-sport community dedicated to fostering athletic excellence, teamwork, and a lifelong passion for sports. From football and cricket to basketball and tennis, we provide world-class facilities, expert coaching, and a vibrant community of athletes at every level.", image: "/images/football.jpg", ctaText: "Read More", ctaLink: "#products" };
}

export async function getMatchSection() {
  await connectDB();
  return MatchSection.findOne().sort({ createdAt: -1 }).lean();
}

export async function getHighlightSection() {
  await connectDB();
  return HighlightSection.findOne().sort({ createdAt: -1 }).lean();
}

export async function getNewsSection() {
  await connectDB();
  return NewsSection.findOne().sort({ createdAt: -1 }).lean();
}

export async function getProductSection() {
  await connectDB();
  return ProductSection.findOne().sort({ createdAt: -1 }).lean();
}

export async function getSubscribeSection() {
  await connectDB();
  return SubscribeSection.findOne().sort({ createdAt: -1 }).lean();
}
