import express from "express";
import { body, param, query, validationResult } from "express-validator";
import { Listing } from "../models/Listing.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  query("type").optional().isIn(["house", "land"]),
  query("status").optional().isIn(["available", "sold"]),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const filter = {};
    if (req.query.type) filter.type = req.query.type;
    if (req.query.status) filter.status = req.query.status;

    const listings = await Listing.find(filter).sort({ createdAt: -1 });
    res.json({ listings });
  },
);

router.get(
  "/:id",
  param("id").isMongoId(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    res.json({ listing });
  },
);

router.post(
  "/",
  requireAuth,
  requireAdmin,
  body("title").isString().isLength({ min: 3, max: 120 }),
  body("type").isIn(["house", "land"]),
  body("price").isNumeric(),
  body("location").isString().isLength({ min: 2, max: 120 }),
  body("description").optional().isString().isLength({ max: 4000 }),
  body("images").optional().isArray(),
  body("areaSqFt").optional().isNumeric(),
  body("bedrooms").optional().isNumeric(),
  body("bathrooms").optional().isNumeric(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const listing = await Listing.create({
      ...req.body,
      createdBy: req.user._id,
      status: "available",
    });
    res.status(201).json({ listing });
  },
);

router.put(
  "/:id",
  requireAuth,
  requireAdmin,
  param("id").isMongoId(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    Object.assign(listing, req.body);
    await listing.save();
    res.json({ listing });
  },
);

router.delete(
  "/:id",
  requireAuth,
  requireAdmin,
  param("id").isMongoId(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    await listing.deleteOne();
    res.json({ ok: true });
  },
);

export default router;

