import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";
// import {
//     getCars,
//     recommendCars,
//     compareCars
// } from "../server//controllers/recommendationController.js"
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", recommendationRoutes);

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Car Recommendation API is running 🚗",
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Basic Error Handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});