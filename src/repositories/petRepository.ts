import { petType } from "@prisma/client";
import { prisma } from "../config/db.js";

import { CategoryAndLocation, RegisterPetData } from "../services/petService.js";

const petRepository = {
  create: async (petData: RegisterPetData) => {
    console.table(petData);

    if (!petData.userId && !petData.organizationId) {
      throw {
        name: "badRequest",
        message: "⚠ User or organization id is required..."
      };
    }

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
  },

  findByCategory: async ({ category, location, userId }: CategoryAndLocation) => {
    return prisma.pet.findMany({
      where: {
        AND: [
          {
            type: {
              equals: category as petType
            },
            user: {
              UserLocation: {
                every: {
                  location: {
                    city: {
                      equals: location.city
                    },
                    state: {
                      equals: location.state
                    }
                  }
                }
              }
            },
            NOT: [
              {
                organizationId: {
                  in: userId
                },
                userId: {
                  in: userId
                }
              }
            ]
          }
        ]
      },
      include: {
        PetImages: true
      }
    });
  }
};

export default petRepository;
