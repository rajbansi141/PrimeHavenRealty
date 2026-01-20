import express from "express";
import { param, validationResult } from "express-validator";
import { Listing } from "../models/Listing.js";
import { Order } from "../models/Order.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// user purchases a listing
router.post(
  "/purchase/:listingId",
  requireAuth,
  param("listingId").isMongoId(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const listing = await Listing.findById(req.params.listingId);
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    if (listing.status !== "available") return res.status(409).json({ message: "Listing not available" });

    const order = await Order.create({
      buyer: req.user._id,
      listing: listing._id,
      priceAtPurchase: listing.price,
    });

    listing.status = "sold";
    await listing.save();

    res.status(201).json({ order });
  },
);

router.get("/mine", requireAuth, async (req, res) => {
  const orders = await Order.find({ buyer: req.user._id })
    .populate("listing")
    .sort({ createdAt: -1 });
  res.json({ orders });
});

export default router;

