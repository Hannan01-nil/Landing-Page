import mongoose from "mongoose";

const heroSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  subheading: { type: String },
  description: { type: String, required: true },
  ctaText: { type: String },
  ctaLink: { type: String },
}, { timestamps: true });

export const Hero = mongoose.models.Hero || mongoose.model("Hero", heroSchema);
