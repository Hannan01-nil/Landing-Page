import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  league: { type: String, required: true },
  date: { type: String, required: true },
  homeTeam: { type: String, required: true },
  awayTeam: { type: String, required: true },
  score: { type: String, required: true },
  sport: { type: String, enum: ["football", "cricket", "basketball", "tennis"], required: true },
}, { timestamps: true });

export const Match = mongoose.models.Match || mongoose.model("Match", matchSchema);
