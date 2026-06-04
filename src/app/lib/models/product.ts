import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String },
  image: { type: String, required: true },
  wide: { type: Boolean, default: false },
}, { timestamps: true });

export const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
