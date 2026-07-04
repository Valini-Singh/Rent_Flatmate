import { Request, Response } from "express";
import prisma from "../config/prisma.js";

export const dashboard = async (
  req: Request,
  res: Response
) => {
  const users = await prisma.user.count();
  const listings = await prisma.listing.count();
  const interests = await prisma.interest.count();

  res.json({
    users,
    listings,
    interests,
  });
};