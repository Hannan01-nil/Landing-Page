import mongoose from "mongoose";

const geoSchema = new mongoose.Schema({
  name: { type: String, default: "Khelo Sporting Club" },
  description: { type: String, default: "" },
  logo: { type: String, default: "/khelo.png" },
  url: { type: String, default: "" },
  foundingYear: { type: Number },
  sameAs: { type: [String], default: [] },
}, { timestamps: true });

export const Geo = mongoose.models.Geo || mongoose.model("Geo", geoSchema);
