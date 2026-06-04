import mongoose from "mongoose";

const highlightSectionSchema = new mongoose.Schema({
  title: { type: String, default: "Highlighted Match" },
  description: { type: String, default: "An exciting match with top teams, thrilling action, and unforgettable moments." },
  featuredImage: { type: String, default: "/images/blog-1.jpg" },
  featuredAlt: { type: String, default: "Highlighted match" },
}, { timestamps: true });

export const HighlightSection = mongoose.models.HighlightSection || mongoose.model("HighlightSection", highlightSectionSchema);
