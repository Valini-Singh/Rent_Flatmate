import { Response } from "express";
import prisma from "../config/prisma.js";
import { AuthRequest } from "../middleware/auth.js";

export const createProfile = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const {
      preferredLocation,
      budgetMin,
      budgetMax,
      moveInDate,
    } = req.body;

    const profile = await prisma.tenantProfile.upsert({
      where: {
        userId: req.user!.id,
      },
      update: {
        preferredLocation,
        budgetMin,
        budgetMax,
        moveInDate: new Date(moveInDate),
      },
      create: {
        userId: req.user!.id,
        preferredLocation,
        budgetMin,
        budgetMax,
        moveInDate: new Date(moveInDate),
      },
    });

    res.status(201).json(profile);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getProfile = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const profile = await prisma.tenantProfile.findUnique({
      where: {
        userId: req.user!.id,
      },
    });

    res.json(profile);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};