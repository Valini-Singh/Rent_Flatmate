import { Router } from "express";

import {
  createProfile,
  getProfile,
} from "../controllers/tenant.controller.js";

import { auth } from "../middleware/auth.js";

const router = Router();

router.post("/", auth, createProfile);

router.get("/", auth, getProfile);

export default router;