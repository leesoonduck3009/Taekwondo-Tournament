import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import v1Routes from "./routes/v1/index.route";
import { config } from "./config/dotenv";
import { connectDB } from "./config/mongose.config";
import { globalExceptionMiddleware } from "./middleware/GlobalExceptionMiddleware";

const app = express();

// Database connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/v1", v1Routes);
app.use(globalExceptionMiddleware);
app.listen(config.port, () => {
  console.log(`🚀 Server is running on http://localhost:${config.port}`);
});
