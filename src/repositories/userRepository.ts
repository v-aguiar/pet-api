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
    return prisma.user.findUnique({ where: { email } });
  },

  findById: async (id: number) => {
    return prisma.user.findUnique({ where: { id } });
  }
};

export default userRepository;
