import Joi from "joi";

export interface SignInData {
  email: string;
  password: string;
}

const signInSchema = Joi.object<SignInData>({
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
  })
});

export default signInSchema;
