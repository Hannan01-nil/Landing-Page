import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  publishedDate: { type: String, required: true },
  duration: { type: String, required: true },
  thumbnail: { type: String, required: true },
}, { timestamps: true });

export const Video = mongoose.models.Video || mongoose.model("Video", videoSchema);
