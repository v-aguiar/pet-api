import { Location, User } from "@prisma/client";

import userRepository from "../repositories/userRepository.js";
import userUtils from "../utils/userUtils.js";

import { CreateUserBody } from "../schemas/createUserSchema.js";
import { SignInData } from "../schemas/signInSchema.js";

export type CreateUserData = Omit<CreateUserBody, "confirmPassword">;
export type CreateUserAndLocationData = {
  user: Omit<User, "id">;
  location: Omit<Location, "id">;
};

const userServices = {
  create: async (userData: CreateUserBody) => {
    const { password, email } = userData;

    const user = await userRepository.findByEmail(email);
    if (user) {
      throw {
        name: "conflict",
        message: "⚠ User already registered..."
      };
    }

    const hashedPassword = userUtils.hashData(password);

    const createUserAndLocationData: CreateUserAndLocationData = {
      user: {
        email,
        password: hashedPassword,
        description: userData?.description,
        name: userData.name,
        imgUrl: userData.imgUrl,
        phoneNumber: userData.phoneNumber,
        role: userData.role
      },
      location: {
        cep: userData.cep,
        complement: userData.complement,
        city: userData.city,
        state: userData.state,
        district: userData?.district,
        streetName: userData.streetName,
        isMainLocation: userData?.isMainLocation
      }
    };

    await userRepository.create(createUserAndLocationData);
  },

  signIn: async ({ email, password }: SignInData) => {
    const userAndLocation = await userRepository.findByEmail(email);
    if (!userAndLocation) {
      throw {
        name: "notFound",
        message: "⚠ Invalid email or password..."
      };
    }

    const { user } = userAndLocation;

    const isPasswordValid = userUtils.compareData(password, user.password);
    if (!isPasswordValid) {
      throw {
        name: "unprocessableEntity",
        message: "⚠ Invalid email or password..."
      };
    }

    const token = userUtils.generateToken(user.id);

    return token;
  },

  getById: async (id: number) => {
    const user = await userRepository.findById(id);
    if (!user) {
      throw {
        name: "notFound",
        message: "⚠ User not found..."
      };
    }

    return user;
  }
};

export default userServices;
