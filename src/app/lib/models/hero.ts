import mongoose from "mongoose";

const heroSchema = new mongoose.Schema({
  badge: { type: String, default: "Introducing\nKhelo\nSporting" },
  badgeMobile: { type: String, default: "Introducing Khelo Sporting" },
  titleFirst: { type: String, default: "S" },
  titleMiddle: { type: String, default: "portin" },
  titleLast: { type: String, default: "g" },
  description: { type: String, default: "We vehemently condemn and disapprove of individuals who are swayed and demoralized by the allure of momentary pleasures." },
  ctaText: { type: String, default: "Book A Ticket" },
  ctaLink: { type: String, default: "#matches" },
  image: { type: String, default: "/images/football.jpg" },
  socialLinks: [{ platform: String, url: String }],
}, { timestamps: true });

export const Hero = mongoose.models.Hero || mongoose.model("Hero", heroSchema);
