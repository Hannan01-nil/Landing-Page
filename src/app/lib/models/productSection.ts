import mongoose from "mongoose";

const productSectionSchema = new mongoose.Schema({
  title: { type: String, default: "Top products\n✳ in our listing" },
  description: { type: String, default: "Explore our top products, meticulously selected for their quality and innovation. Each item promises exceptional value and performance." },
  ctaText: { type: String, default: "Explore All" },
  ctaLink: { type: String, default: "#subscribe" },
}, { timestamps: true });

export const ProductSection = mongoose.models.ProductSection || mongoose.model("ProductSection", productSectionSchema);
