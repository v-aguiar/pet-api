import { prisma } from "../config/db.js";
import { CreateUserAndLocationData } from "../services/userServices.js";

const userRepository = {
  create: async ({ location, user }: CreateUserAndLocationData) => {
    return prisma.user.create({
      data: {
        ...user,
        UserLocation: {
          create: {
            location: {
              create: location
            }
          }
        }
      }
    });
  },

  findByEmail: async (email: string) => {
    return prisma.userLocation.findFirst({
      where: { user: { email } },
      select: {
        user: true,
        location: true
      }
    });
  },

  findById: async (id: number) => {
    return prisma.userLocation.findFirst({
      where: { userId: id },
      select: {
        user: true,
        location: true
      }
    });
  }
};

export default userRepository;
