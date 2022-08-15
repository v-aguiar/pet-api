import { prisma } from "../config/db.js";

export type LocationByUserId = {
  userId: number;
  location: {
    id: number;
    city: string;
    state: string;
  };
} | null;

const locationRepository = {
  findByUserId: async (userId: number): Promise<LocationByUserId> => {
    return prisma.userLocation.findFirst({
      where: {
        userId: {
          not: userId
        },
        AND: { location: { isMainLocation: true } }
      },
      select: {
        userId: true,
        location: {
          select: {
            id: true,
            city: true,
            state: true
          }
        }
      }
    });
  }
};

export default locationRepository;
