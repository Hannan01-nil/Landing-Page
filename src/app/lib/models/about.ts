import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  badge: { type: String, default: "⊕ About Us" },
  title: { type: String, default: "Who we are" },
  description: { type: String, default: "Khelo Sporting Club is a premier multi-sport community dedicated to fostering athletic excellence, teamwork, and a lifelong passion for sports. From football and cricket to basketball and tennis, we provide world-class facilities, expert coaching, and a vibrant community of athletes at every level." },
  image: { type: String, default: "/images/football.jpg" },
  ctaText: { type: String, default: "Read More" },
  ctaLink: { type: String, default: "#products" },
}, { timestamps: true });

export const About = mongoose.models.About || mongoose.model("About", aboutSchema);
