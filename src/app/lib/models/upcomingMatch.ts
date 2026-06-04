import mongoose from "mongoose";

const upcomingMatchSchema = new mongoose.Schema({
  league: { type: String, required: true },
  days: { type: Number, required: true },
  hours: { type: Number, required: true },
  minutes: { type: Number, required: true },
  seconds: { type: Number, required: true },
}, { timestamps: true });

export const UpcomingMatch = mongoose.models.UpcomingMatch || mongoose.model("UpcomingMatch", upcomingMatchSchema);
