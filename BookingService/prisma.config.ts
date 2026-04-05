import { config as loadEnv } from "dotenv";
import { resolve } from "node:path";
import { defineConfig } from "@prisma/config";

loadEnv({ path: resolve(__dirname, ".env") });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set. Check the BookingService .env file.");
}

export default defineConfig({
  schema: resolve(__dirname, "./src/prisma/schema.prisma"),
  migrations: {
    path: resolve(__dirname, "./src/prisma/migrations"),
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
