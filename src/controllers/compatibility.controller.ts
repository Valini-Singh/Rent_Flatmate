import { Request, Response } from "express";
import prisma from "../config/prisma.js";
import { calculateCompatibility } from "../services/compatibility.service.js";

export const getCompatibility = async (
  req: Request,
  res: Response
) => {
  try {
    const tenantId = req.params.tenantId as string;
    const listingId = req.params.listingId as string;
    const tenant = await prisma.tenantProfile.findUnique({
      where: {
        userId: tenantId,
      },
    });

    if (!tenant) {
      return res.status(404).json({
        message: "Tenant profile not found",
      });
    }

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
    });

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }

    const result = calculateCompatibility(
      tenant,
      listing
    );

    const compatibility =
      await prisma.compatibility.upsert({
        where: {
          tenantId_listingId: {
            tenantId,
            listingId,
          },
        },
        update: {
          score: result.score,
          explanation: result.explanation,
        },
        create: {
          tenantId,
          listingId,
          score: result.score,
          explanation: result.explanation,
        },
      });

    res.json(compatibility);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};