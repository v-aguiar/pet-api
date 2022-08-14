import { prisma } from "../config/db.js";

import { RegisterPetData } from "../services/petService.js";

const petRepository = {
  create: async (petData: RegisterPetData) => {
    return prisma.pet.create({
      data: {
        color: petData.color,
        name: petData.name,
        breed: petData.breed,
        sex: petData.sex,
        spayedOrNeutered: petData.spayedOrNeutered,
        status: petData.status,
        type: petData.type,
        description: petData.description,
        organizationId: petData.organizationId,
        userId: petData.userId,
        PetImages: {
          createMany: { data: petData.images }
        }
      }
    });
  }
};

export default petRepository;
