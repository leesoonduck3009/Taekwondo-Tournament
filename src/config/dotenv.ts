import dotenv from "dotenv";

// Define environment
const ENV = process.env.NODE_ENV || "development";
// Load .env file
dotenv.config({ path: `.${ENV}.env` });
console.log(`CONNECTION_STRING: ${process.env.CONNECTION_STRING}`);
export const config = {
  env: ENV,
  port: process.env.PORT || 3000,
  connectionString: process.env.CONNECTION_STRING || "",
};
