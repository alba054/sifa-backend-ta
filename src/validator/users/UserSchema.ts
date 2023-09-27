import Joi from "joi";

export const UserProfilePayloadSchema = Joi.object({
  fullname: Joi.string().optional(),
  username: Joi.string().optional().max(25),
  email: Joi.string().optional(),
});

export const UserPayloadSchema = Joi.object({
  fullname: Joi.string().required(),
  username: Joi.string().required().max(25),
  email: Joi.string().optional(),
  role: Joi.string().valid("LECTURER", "STUDENT", "ADMIN").required(),
  password: Joi.string().required(),
});

export const UserProfileMasterPayloadSchema = Joi.object({
  fullname: Joi.string().optional(),
  username: Joi.string().optional().max(25),
  email: Joi.string().optional(),
  role: Joi.string().valid("LECTURER", "STUDENT", "ADMIN").optional(),
  password: Joi.string().optional(),
});
