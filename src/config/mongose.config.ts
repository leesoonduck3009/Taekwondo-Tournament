import mongoose from "mongoose";
import { config } from "./dotenv";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.connectionString, {
      // Các tùy chọn khác có thể thêm ở đây nếu cần
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
