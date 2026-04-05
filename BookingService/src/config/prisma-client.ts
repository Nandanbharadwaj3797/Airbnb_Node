import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { config as loadEnv } from "dotenv";
import { resolve } from "node:path";

loadEnv({ path: resolve(__dirname, "../../.env") });

if (!process.env.DATABASE_URL) {
	throw new Error("DATABASE_URL is not set. Check the BookingService .env file.");
}

const adapter = new PrismaMariaDb(process.env.DATABASE_URL);

const prismaClient = new PrismaClient({ adapter });

export default prismaClient;