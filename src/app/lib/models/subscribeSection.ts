import mongoose from "mongoose";

const subscribeSectionSchema = new mongoose.Schema({
  title: { type: String, default: "Subscribe to our newsletter" },
  placeholder: { type: String, default: "Enter your email" },
  buttonText: { type: String, default: "Subscribe" },
}, { timestamps: true });

export const SubscribeSection = mongoose.models.SubscribeSection || mongoose.model("SubscribeSection", subscribeSectionSchema);
