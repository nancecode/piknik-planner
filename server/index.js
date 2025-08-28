import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { connectToDB } from "./db.js";

import parkRoutes from "./routes/parkRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import piknikRoutes from "./routes/piknikRoutes.js";
import rsvpRoute from "./routes/rsvpRoute.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

// ✅ CORS configuration
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

// ✅ Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ✅ API routes
app.use("/api/parks", parkRoutes);
app.use("/auth", authRoutes);
app.use("/api/events", eventRoutes); 
app.use("/api/pikniks", piknikRoutes);
app.use("/api/rsvp", rsvpRoute);
app.use("/api", userRoutes);

// ✅ Health check
app.get("/", (req, res) => {
  res.send("🌞 Piknik API is running");
});

// ✅ Connect to DB and start server
connectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to start server:", err);
  });
