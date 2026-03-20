import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

function buildAdapter() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL не задан. Для database-режима нужно подключить MySQL."
    );
  }

  const parsedUrl = new URL(databaseUrl);
  const database = parsedUrl.pathname.replace(/^\//, "");

  return new PrismaMariaDb({
    host: parsedUrl.hostname,
    port: Number(parsedUrl.port || 3306),
    user: decodeURIComponent(parsedUrl.username),
    password: decodeURIComponent(parsedUrl.password),
    database,
    connectionLimit: 5,
  });
}

export function getPrismaClient(): PrismaClient {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  const client = new PrismaClient({
    adapter: buildAdapter(),
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

  globalForPrisma.prisma = client;

  return client;
}
