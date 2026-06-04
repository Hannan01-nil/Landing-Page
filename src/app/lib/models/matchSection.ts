import mongoose from "mongoose";

const matchSectionSchema = new mongoose.Schema({
  title: { type: String, default: "Khelo sporting info\nand updates" },
}, { timestamps: true });

export const MatchSection = mongoose.models.MatchSection || mongoose.model("MatchSection", matchSectionSchema);
