import userRepository from "../repositories/userRepository.js";
import userUtils from "../utils/userUtils.js";

import { CreateUserBody } from "../schemas/createUserSchema.js";
export type CreateUserData = Omit<CreateUserBody, "confirmPassword">;

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

    const createUserData: CreateUserData = {
      email,
      password: hashedPassword,
      description: userData.description,
      firstName: userData.firstName,
      lastName: userData.lastName,
      imgUrl: userData.imgUrl,
      phoneNumber: userData.phoneNumber,
      role: userData.role
    };

    const createdUser = await userRepository.create(createUserData);

    return createdUser.id;
  }
};

export default userServices;
