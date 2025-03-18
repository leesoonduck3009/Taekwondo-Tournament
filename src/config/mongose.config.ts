import mongoose from "mongoose";
import { config } from "./dotenv";

export const connectDB = async () => {
  try {
    console.log("config.connectionString", config.connectionString);
    await mongoose.connect(config.connectionString, {
      // Các tùy chọn khác có thể thêm ở đây nếu cần
    });
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
