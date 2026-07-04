import { Server } from "socket.io";
import prisma from "../config/prisma.js";

export const initializeSocket = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    socket.on("join-room", (roomId: string) => {
      socket.join(roomId);
    });

    socket.on(
      "send-message",
      async (data: {
        roomId: string;
        senderId: string;
        text: string;
      }) => {
        const message = await prisma.message.create({
          data: {
            roomId: data.roomId,
            senderId: data.senderId,
            text: data.text,
          },
        });

        io.to(data.roomId).emit(
          "receive-message",
          message
        );
      }
    );

    socket.on("disconnect", () => {
      console.log("Disconnected");
    });
  });
};