import mongoose from "mongoose";

const featuredVideoSchema = new mongoose.Schema({
  image: { type: String, required: true },
  alt: { type: String, required: true },
}, { timestamps: true });

export const FeaturedVideo = mongoose.models.FeaturedVideo || mongoose.model("FeaturedVideo", featuredVideoSchema);
