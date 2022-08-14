import { Pet } from "@prisma/client";

import petRepository from "../repositories/petRepository.js";
import userRepository from "../repositories/userRepository.js";

import { PetImages, RegisterPetBody } from "../schemas/registerPetSchema.js";

export type RegisterPetWithId = RegisterPetBody & { id: number };
export type RegisterPetData = Omit<Pet, "id"> & { images: PetImages };

const petService = {
  register: async (registerPetData: RegisterPetWithId) => {
    const { id } = registerPetData;

    const userData = await userRepository.findById(id);
    if (!userData) {
      throw {
        name: "notFound",
        message: "⚠ User not found..."
      };
    }

    const petData: RegisterPetData = {
      ...registerPetData,
      userId: null,
      organizationId: null
    };

    if (userData.user.role === "organization") {
      petData.organizationId = id;
    } else {
      petData.userId = id;
    }

    try {
      await petRepository.create(petData);
    } catch (error: any) {
      console.error("⚠ Error on create...", error);
      if (error.code === "P2002") {
        throw {
          name: "conflict",
          message: error.message
        };
      }
    }
  }
};

export default petService;
