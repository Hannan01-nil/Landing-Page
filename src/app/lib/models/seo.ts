import mongoose from "mongoose";

const seoEntrySchema = new mongoose.Schema({
  route: { type: String, required: true },
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  ogImage: { type: String, default: "" },
}, { _id: false });

const seoSchema = new mongoose.Schema({
  entries: [seoEntrySchema],
}, { timestamps: true });

export const Seo = mongoose.models.Seo || mongoose.model("Seo", seoSchema);
