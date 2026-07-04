import express from "express";
import cors from "cors";

import listingRoutes from "./routes/listing.routes.js";
import authRoutes from "./routes/auth.routes.js";
import tenantRoutes from "./routes/tenant.routes.js";
import interestRoutes from "./routes/interest.routes.js";
import messageRoutes from "./routes/message.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API Running 🚀"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/tenant", tenantRoutes);
app.use("/api/interests", interestRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/admin", adminRoutes);


export default app;