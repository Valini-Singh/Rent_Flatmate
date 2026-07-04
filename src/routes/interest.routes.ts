import { Router } from "express";

import {
  sendInterest,
  getOwnerInterests,
  acceptInterest,
  declineInterest,
} from "../controllers/interest.controller.js";

import { auth } from "../middleware/auth.js";

const router = Router();

router.post("/", auth, sendInterest);

router.get("/", auth, getOwnerInterests);

router.patch("/:id/accept", auth, acceptInterest);

router.patch("/:id/decline", auth, declineInterest);

export default router;