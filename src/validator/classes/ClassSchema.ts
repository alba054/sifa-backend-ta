import Joi from "joi";

export const ClassPayloadSchema = Joi.object({
  name: Joi.string().required(),
  subjectId: Joi.string().required(),
});

export const ClassEditPayloadSchema = Joi.object({
  name: Joi.string().optional(),
  subjectId: Joi.string().optional(),
});
