import mongoose from "mongoose";

const newsArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  date: { type: String, required: true },
  plain: { type: Boolean, default: false },
}, { timestamps: true });

export const NewsArticle = mongoose.models.NewsArticle || mongoose.model("NewsArticle", newsArticleSchema);
