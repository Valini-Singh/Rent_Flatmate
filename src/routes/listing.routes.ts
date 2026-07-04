import { Router } from "express";

import {
  createListing,
  getAllListings,
  getMyListings,
  updateListing,
  deleteListing,
  markFilled,
} from "../controllers/listing.controller.js";

import { auth } from "../middleware/auth.js";
import { ownerOnly } from "../middleware/owner.js";

const router = Router();

// Public (Tenant can browse)
router.get("/", getAllListings);

// Owner Routes
router.post("/", auth, ownerOnly, createListing);

router.get("/my-listings", auth, ownerOnly, getMyListings);

router.put("/:id", auth, ownerOnly, updateListing);

router.delete("/:id", auth, ownerOnly, deleteListing);

router.patch("/:id/fill", auth, ownerOnly, markFilled);

export default router;