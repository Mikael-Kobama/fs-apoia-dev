import { PrismaClient } from "@/generated/prisma";
import { withAccelerate } from "@prisma/extension-accelerate";

// Extraímos o tipo real que o Prisma gera com a extensão
type PrismaClientWithExtensions = ReturnType<typeof createExtendedClient>;

function createExtendedClient() {
  return new PrismaClient(undefined as any).$extends(withAccelerate());
}

// Agora o global conhece os modelos (user, donation, etc)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientWithExtensions;
};

export const prisma = globalForPrisma.prisma || createExtendedClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
