import { faker } from "@faker-js/faker";
import { prisma } from "../../src/config/db.js";

import userUtils from "../../src/utils/userUtils.js";

import { CreateUserBody } from "../../src/schemas/createUserSchema.js";
import { CreateUserData } from "../../src/services/userServices.js";

const userFactory = {
  generateUserBody: () => {
    const password = faker.internet.password();
    const hashedPassword = userUtils.hashData(password);

    const createUserBody: CreateUserBody = {
      password: hashedPassword,
      confirmPassword: hashedPassword,
      email: faker.internet.email(),
      description: faker.lorem.paragraph(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      imgUrl: faker.image.imageUrl(),
      phoneNumber: faker.phone.number("###########"),
      role: faker.helpers.arrayElement(["default", "temporaryCare", "organization"])
    };

    return createUserBody;
  },

  create: async () => {
    const password = faker.internet.password();
    const hashedPassword = userUtils.hashData(password);

    const createUserData: CreateUserData = {
      password: hashedPassword,
      email: faker.internet.email(),
      description: faker.lorem.paragraph(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      imgUrl: faker.image.imageUrl(),
      phoneNumber: faker.phone.number("###########"),
      role: faker.helpers.arrayElement(["default", "temporaryCare", "organization"])
    };

    const createdUser = await prisma.user.create({ data: createUserData });

    return {
      ...createdUser,
      signInPassword: password
    };
  }
};

export default userFactory;
