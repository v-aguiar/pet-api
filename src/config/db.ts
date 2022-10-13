import { PrismaClient } from "@prisma/client";

export let prisma: PrismaClient;
export const connectDb = (): void => {
  prisma = new PrismaClient();
};

export const disconnectDb = async (): Promise<void> => {
  await prisma.$disconnect();
};
