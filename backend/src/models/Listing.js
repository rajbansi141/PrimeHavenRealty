import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    type: { type: String, enum: ["house", "land"], required: true },
    price: { type: Number, required: true, min: 0 },
    location: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    images: [{ type: String }],
    areaSqFt: { type: Number, min: 0 },
    bedrooms: { type: Number, min: 0 },
    bathrooms: { type: Number, min: 0 },
    status: { type: String, enum: ["available", "sold"], default: "available" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

export const Listing = mongoose.model("Listing", listingSchema);

