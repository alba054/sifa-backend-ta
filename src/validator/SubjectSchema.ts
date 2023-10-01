import Joi from "joi";

export const SubjectPayloadSchema = Joi.object({
  name: Joi.string().required(),
  code: Joi.string().optional(),
});

export const SubjectEditPayloadSchema = Joi.object({
  name: Joi.string().optional(),
  code: Joi.string().optional(),
});
