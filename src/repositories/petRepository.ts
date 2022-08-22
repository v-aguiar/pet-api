import { petType } from "@prisma/client";
import { prisma } from "../config/db.js";

import { CategoryAndLocation, RegisterPetData } from "../services/petService.js";

type UserIdAndLocation = {
  userId: number;
  location: {
    id: number;
    city: string;
    state: string;
  };
};

const petRepository = {
  create: async (petData: RegisterPetData) => {
    if (!petData.userId && !petData.organizationId) {
      throw {
        name: "badRequest",
        message: "⚠ UserID or organizationId is required..."
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
  },

  findByLocation: async ({ userId, location }: UserIdAndLocation) => {
    return prisma.pet.findMany({
      where: {
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
        }
      },
      include: {
        PetImages: {
          select: {
            imageUrl: true
          }
        }
      }
    });
  },

  findById: async (id: number, userId: number) => {
    return prisma.pet.findUnique({
      where: {
        id
      },
      include: {
        PetImages: {
          select: {
            imageUrl: true
          }
        },
        user: {
          select: {
            imgUrl: true,
            name: true,
            description: true,
            email: true,
            phoneNumber: true,
            UserLocation: {
              select: {
                location: {
                  select: {
                    city: true,
                    state: true
                  }
                }
              }
            }
          }
        }
      }
    });
  }
};

export default petRepository;
