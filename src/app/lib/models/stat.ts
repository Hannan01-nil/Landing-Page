import mongoose from "mongoose";

const statSchema = new mongoose.Schema({
  value: { type: String, required: true },
  label: { type: String, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

export const Stat = mongoose.models.Stat || mongoose.model("Stat", statSchema);
