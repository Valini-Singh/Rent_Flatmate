import { Response } from "express";
import prisma from "../config/prisma.js";
import { AuthRequest } from "../middleware/auth.js";

export const createListing = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const {
      location,
      rent,
      roomType,
      furnished,
      availableFrom,
      imageUrl,
    } = req.body;

    if (req.user?.role !== "OWNER") {
      return res.status(403).json({
        message: "Only owners can create listings",
      });
    }

    const listing = await prisma.listing.create({
      data: {
        ownerId: req.user.id,
        location,
        rent: Number(rent),
        roomType,
        furnished,
        availableFrom: new Date(availableFrom),
        imageUrl,
      },
    });

    res.status(201).json({
      success: true,
      listing,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getAllListings = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const listings = await prisma.listing.findMany({
      where: {
        status: "AVAILABLE",
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(listings);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getMyListings = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const listings = await prisma.listing.findMany({
      where: {
        ownerId: req.user!.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(listings);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const updateListing = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const id = req.params.id as string;

    const listing = await prisma.listing.findUnique({
      where: {
        id,
      },
    });

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }

    if (listing.ownerId !== req.user!.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    const updated = await prisma.listing.update({
      where: {
        id,
      },
      data: req.body,
    });

    res.json(updated);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const deleteListing = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const id = req.params.id as string;

    const listing = await prisma.listing.findUnique({
      where: {
        id,
      },
    });

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }

    if (listing.ownerId !== req.user!.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    await prisma.listing.delete({
      where: {
        id,
      },
    });

    res.json({
      message: "Listing deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const markFilled = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const id = req.params.id as string;
    const listing = await prisma.listing.findUnique({
      where: {
        id,
      },
    });

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }

    const updated = await prisma.listing.update({
      where: {
        id,
      },
      data: {
        status: "FILLED",
      },
    });

    res.json(updated);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};