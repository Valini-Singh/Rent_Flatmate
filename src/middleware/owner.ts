import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.js";

export const ownerOnly = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  if (req.user.role !== "OWNER") {
    return res.status(403).json({
      message: "Only owners can perform this action",
    });
  }

  next();
};