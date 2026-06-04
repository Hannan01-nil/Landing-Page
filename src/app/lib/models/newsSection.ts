import mongoose from "mongoose";

const newsSectionSchema = new mongoose.Schema({
  title: { type: String, default: "Latest News" },
  ctaText: { type: String, default: "See All News" },
  ctaLink: { type: String, default: "#about" },
}, { timestamps: true });

export const NewsSection = mongoose.models.NewsSection || mongoose.model("NewsSection", newsSectionSchema);
