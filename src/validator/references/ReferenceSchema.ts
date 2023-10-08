import Joi from "joi";

export const ReferencePayloadSchema = Joi.object({
  name: Joi.string().optional(),
  attachments: Joi.array().items(Joi.string()).min(1).optional(),
  classId: Joi.string().required(),
  description: Joi.string().optional(),
});
