import { Request, Response } from "express";

import prisma from "../config/prisma.js";

export const getMessages = async (
  req: Request,
  res: Response
) => {
  const roomId = req.params.roomId as string;

  const messages =
    await prisma.message.findMany({
      where: {
        roomId,
      },
      include: {
        sender: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

  res.json(messages);
};