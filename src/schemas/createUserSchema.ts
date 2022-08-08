import { User } from "@prisma/client";

import Joi from "joi";

export type CreateUserBody = Omit<User, "id"> & { confirmPassword: String };

const createUserSchema = Joi.object<CreateUserBody>({
  email: Joi.string().email().required().messages({
    "string.email": "⚠ Email is not valid...",
    "string.empty": "⚠ Email cannot be empty...",
    "string.required": "⚠ Email is required...",
    "string.base": "⚠ Email must be of type string..."
  }),
  password: Joi.string().required().messages({
    "string.empty": "⚠ Password cannot be empty...",
    "string.required": "⚠ Password is required...",
    "string.base": "⚠ Password must be of type string..."
  }),
  confirmPassword: Joi.ref("password"),
  description: Joi.string().messages({
    "string.base": "⚠ Description must be of type string..."
  }),
  firstName: Joi.string().required().messages({
    "string.empty": "⚠ First name cannot be empty...",
    "string.required": "⚠ First name is required...",
    "string.base": "⚠ First name must be of type string..."
  }),
  lastName: Joi.string().required().messages({
    "string.empty": "⚠ Last name cannot be empty...",
    "string.required": "⚠ Last name is required...",
    "string.base": "⚠ Last name must be of type string..."
  }),
  imgUrl: Joi.string().uri().required().messages({
    "string.uri": "⚠ Image url is not valid...",
    "string.base": "⚠ Image url must be of type string...",
    "string.required": "⚠ Image url is required..."
  }),
  phoneNumber: Joi.string()
    .min(10)
    .regex(/^[0-9]*$/)
    .required()
    .messages({
      "string.base": "⚠ Phone number must be of type string...",
      "string.min": "⚠ Phone number must be at least 10 characters long...",
      "string.regex": "⚠ Phone number must be numeric...",
      "string.required": "⚠ Phone number is required..."
    }),
  role: Joi.string().valid("default", "temporaryCare", "organization").required().messages({
    "string.base": "⚠ Role must be of type string...",
    "string.valid": "⚠ Role must be one of the following: default, temporaryCare, organization...",
    "string.required": "⚠ Role is required..."
  })
});

export default createUserSchema;
