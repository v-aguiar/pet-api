import { prisma } from "../config/db.js";
import { CreateUserData } from "../services/userServices.js";

const userRepository = {
  create: async (createdUserData: CreateUserData) => {
    return prisma.user.create({
      data: createdUserData
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
