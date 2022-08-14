import { Pet } from "@prisma/client";
import Joi from "joi";

export type PetImages = {
  imageUrl: string;
}[];
export type RegisterPetBody = Omit<Pet, "id" | "userId" | "organizationId"> & {
  images: PetImages;
};

const registerPetSchema = Joi.object<RegisterPetBody>({
  name: Joi.string().required().messages({
    "string.base": "⚠ Name must be a string",
    "string.empty": "⚠ Name must not be empty",
    "string.required": "⚠ Name is required"
  }),
  type: Joi.string().valid("cat", "dog", "rabbit", "rodent", "bird", "outro").required().messages({
    "string.base": "⚠ Type must be a string",
    "string.empty": "⚠ Type must not be empty",
    "string.required": "⚠ Type is required",
    "any.only": "⚠ Type must be one of the following: cat, dog, rabbit, rodent, bird, outro"
  }),
  description: Joi.string().optional().allow("").messages({
    "string.base": "⚠ Description must be a string"
  }),
  breed: Joi.string().optional().allow("").messages({
    "string.base": "⚠ Breed must be a string"
  }),
  color: Joi.string().required().messages({
    "string.base": "⚠ Color must be a string",
    "string.empty": "⚠ Color must not be empty",
    "string.required": "⚠ Color is required"
  }),
  sex: Joi.string().valid("female", "male").required().messages({
    "string.base": "⚠ Sex must be a string",
    "string.empty": "⚠ Sex must not be empty",
    "string.required": "⚠ Sex is required",
    "any.only": "⚠ Sex must be one of the following: female, male"
  }),
  spayedOrNeutered: Joi.boolean().required().messages({
    "boolean.base": "⚠  SpayedOrNeutered must be a boolean",
    "boolean.required": "⚠ SpayedOrNeutered is required"
  }),
  status: Joi.string().valid("waiting", "temporaryCare", "adopted").required().messages({
    "string.base": "⚠ Status must be a string",
    "string.empty": "⚠ Status must not be empty",
    "string.required": "⚠ Status is required",
    "any.only": "⚠ Status must be one of the following: waiting, temporaryCare, adopted"
  }),
  images: Joi.array()
    .min(1)
    .items(
      Joi.object({
        imageUrl: Joi.string().uri().required().messages({
          "string.base": "⚠ ImageUrl must be a string",
          "string.empty": "⚠ ImageUrl must not be empty",
          "string.required": "⚠ ImageUrl is required",
          "string.uri": "⚠ ImageUrl must be a valid URI"
        })
      })
    )
    .required()
    .messages({
      "array.base": "⚠ Images must be an array",
      "array.required": "⚠ Images is required",
      "array.min": "⚠ Images array must have at least 1 item",
      "array.items.base": "⚠ Images array items must be an object"
    })
});

export default registerPetSchema;
