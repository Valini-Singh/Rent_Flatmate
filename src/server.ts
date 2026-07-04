// import "dotenv/config";
// import app from "./app.js";

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

import "dotenv/config";

import http from "http";

import { Server } from "socket.io";

import app from "./app.js";

import { initializeSocket } from "./socket/socket.js";

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

initializeSocket(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});