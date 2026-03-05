import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

let db;

if (process.env.NODE_ENV === "production") {
  db = new PrismaClient();
} else {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient();
  }
  db = globalForPrisma.prisma;
}

export { db };

// globalThis.prisma: This global variable ensures that the Prisma client instance is
// reused across hot reloads during development. Without this, each time your application
// reloads, a new instance of the Prisma client would be created, potentially leading
// to connection issues.
