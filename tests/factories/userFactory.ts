import { faker } from "@faker-js/faker";
import { prisma } from "../../src/config/db.js";

import userUtils from "../../src/utils/userUtils.js";

import { CreateUserBody } from "../../src/schemas/createUserSchema.js";
import { CreateUserAndLocationData } from "../../src/services/userServices.js";

const userFactory = {
  generateUserBody: () => {
    const password = faker.internet.password();
    const hashedPassword = userUtils.hashData(password);

    const createUserBody: CreateUserBody = {
      password: hashedPassword,
      confirmPassword: hashedPassword,
      email: faker.internet.email(),
      description: faker.lorem.paragraph(),
      name: faker.name.findName(),
      imgUrl: faker.image.imageUrl(),
      phoneNumber: faker.phone.number("###########"),
      role: faker.helpers.arrayElement(["default", "temporaryCare", "organization"]),
      cep: faker.address.zipCode("########"),
      complement: faker.address.secondaryAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      district: faker.address.county(),
      streetName: faker.address.street(),
      isMainLocation: faker.datatype.boolean()
    };

    return createUserBody;
  },

  create: async () => {
    const password = faker.internet.password();
    const hashedPassword = userUtils.hashData(password);

    const createUserData: CreateUserAndLocationData = {
      user: {
        password: hashedPassword,
        email: faker.internet.email(),
        description: faker.lorem.paragraph(),
        name: faker.name.findName(),
        imgUrl: faker.image.imageUrl(),
        phoneNumber: faker.phone.number("###########"),
        role: faker.helpers.arrayElement(["default", "temporaryCare", "organization"])
      },
      location: {
        cep: faker.address.zipCode("########"),
        complement: faker.address.secondaryAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        district: faker.address.county(),
        streetName: faker.address.street(),
        isMainLocation: faker.datatype.boolean()
      }
    };

    const createdUser = await prisma.user.create({
      data: {
        ...createUserData.user,
        UserLocation: {
          create: {
            location: {
              create: {
                ...createUserData.location
              }
            }
          }
        }
      }
    });

    return {
      ...createdUser,
      signInPassword: password
    };
  }
};

export default userFactory;
