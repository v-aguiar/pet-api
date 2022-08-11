import { Location, User } from "@prisma/client";

import Joi from "joi";

export type CreateUserBody = Omit<User, "id"> & { confirmPassword: String } & Omit<Location, "id">;

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
  name: Joi.string().required().messages({
    "string.empty": "⚠ Name cannot be empty...",
    "string.required": "⚠ Name is required...",
    "string.base": "⚠ Name must be of type string..."
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
  }),
  cep: Joi.string()
    .length(8)
    .regex(/^[0-9]*$/)
    .required()
    .messages({
      "string.base": "⚠ Cep must be of type string...",
      "string.length": "⚠ Cep must be at least 8 characters long...",
      "string.regex": "⚠ Cep must be numeric...",
      "string.required": "⚠ Cep is required..."
    }),
  complement: Joi.string().messages({
    "string.base": "⚠ Complement must be of type string..."
  }),
  isMainLocation: Joi.boolean().messages({
    "boolean.base": "⚠ 'isMainLocation' must be of type boolean..."
  }),
  city: Joi.string().required().messages({
    "string.empty": "⚠ City cannot be empty...",
    "string.required": "⚠ City is required...",
    "string.base": "⚠ City must be of type string..."
  }),
  district: Joi.string().messages({
    "string.base": "⚠ District must be of type string..."
  }),
  state: Joi.string().required().messages({
    "string.empty": "⚠ State cannot be empty...",
    "string.required": "⚠ State is required...",
    "string.base": "⚠ State must be of type string..."
  }),
  streetName: Joi.string().required().messages({
    "string.empty": "⚠ Street name cannot be empty...",
    "string.required": "⚠ Street name is required...",
    "string.base": "⚠ Street name must be of type string..."
  })
});

export default createUserSchema;
