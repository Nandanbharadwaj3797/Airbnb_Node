import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set. Check the BookingService .env file.");
}

function buildMariaDbConnectionUrl(rawUrl: string): string {
  const connectionUrl = new URL(rawUrl);

  if (!connectionUrl.searchParams.has("allowPublicKeyRetrieval")) {
    connectionUrl.searchParams.set("allowPublicKeyRetrieval", "true");
  }

  const rsaPublicKeyPath = process.env.DB_RSA_PUBLIC_KEY_PATH;
  if (rsaPublicKeyPath && !connectionUrl.searchParams.has("cachingRsaPublicKey")) {
    connectionUrl.searchParams.set("cachingRsaPublicKey", rsaPublicKeyPath);
  }

  return connectionUrl.toString();
}

const adapter = new PrismaMariaDb(buildMariaDbConnectionUrl(process.env.DATABASE_URL));

const prismaClient = global.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prismaClient;
}

export default prismaClient;
