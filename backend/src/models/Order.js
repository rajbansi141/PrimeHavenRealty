import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    listing: { type: mongoose.Schema.Types.ObjectId, ref: "Listing", required: true },
    priceAtPurchase: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
);

export const Order = mongoose.model("Order", orderSchema);

