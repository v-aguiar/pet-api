import { Pet } from "@prisma/client";
import locationRepository, { LocationByUserId } from "../repositories/locationRepository.js";

import petRepository from "../repositories/petRepository.js";
import userRepository from "../repositories/userRepository.js";

import { PetImages, RegisterPetBody } from "../schemas/registerPetSchema.js";

export type RegisterPetWithId = RegisterPetBody & { id: number };
export type RegisterPetData = Omit<Pet, "id"> & { images: PetImages };

export type PetData = {
  category: string;
  userId: number;
};

export type CategoryAndLocation = Omit<PetData, "userId"> & LocationByUserId;

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
  },

  findByCategory: async ({ userId, category }: PetData) => {
    const locationData = await locationRepository.findByUserId(userId);
    if (!locationData || locationData.userId === userId) {
      throw {
        name: "notFound",
        message: "⚠ User location not found..."
      };
    }

    const pets = await petRepository.findByCategory({ category, ...locationData });
    if (!pets || pets.length === 0) {
      throw {
        name: "notFound",
        message: "⚠ No pets found on user location..."
      };
    }

    return pets;
  }
};

export default petService;
