import { Response } from "express";
import prisma from "../config/prisma.js";
import { AuthRequest } from "../middleware/auth.js";
import { sendEmail } from "../utils/email.js";

export const sendInterest = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { listingId } = req.body;

    const existing = await prisma.interest.findFirst({
  where: {
    tenantId: req.user!.id,
    listingId,
  },
});

if (existing) {
  return res.status(400).json({
    message: "Interest already sent",
  });
}

const interest = await prisma.interest.create({
  data: {
    tenantId: req.user!.id,
    listingId,
  },
});

    res.status(201).json(interest);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getOwnerInterests = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const interests = await prisma.interest.findMany({
      where: {
    listing: {
      ownerId: req.user!.id,
    },
  },
      include: {
        tenant: true,
        listing: true,
      },
    });

    res.json(interests);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const acceptInterest = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const id = req.params.id as string;

    const interest = await prisma.interest.update({
      where: {
        id,
      },
      data: {
        status: "ACCEPTED",
      },
    });

    const room = await prisma.chatRoom.create({
      data: {
        interestId: interest.id,
      },
    });

    const tenant = await prisma.user.findUnique({
        where: {
    id: interest.tenantId,
  },
});

if (tenant) {
  await sendEmail(
    tenant.email,
    "Interest Accepted",
    "Congratulations! Your rental request has been accepted."
  );
}

    res.json({
      interest,
      room,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const declineInterest = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const id = req.params.id as string;

    const interest = await prisma.interest.update({
      where: {
        id,
      },
      data: {
        status: "DECLINED",
      },
    });

    res.json(interest);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};