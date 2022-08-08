import { prisma } from "../config/db.js";
import { CreateUserData } from "../services/userServices.js";

const userRepository = {
  create: async (createdUserData: CreateUserData) => {
    return await prisma.user.create({
      data: createdUserData
    });
  },

  findByEmail: async (email: string) => {
    return await prisma.user.findUnique({ where: { email } });
  }
};

export default userRepository;
