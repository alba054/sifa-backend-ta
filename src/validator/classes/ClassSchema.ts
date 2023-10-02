import Joi from "joi";
import { DAY, DAYS } from "../../utils";

export const ClassPayloadSchema = Joi.object({
  name: Joi.string().required(),
  subjectId: Joi.string().required(),
  day: Joi.string()
    .valid(...DAYS)
    .required(),
  time: Joi.number().min(0).required(),
});

export const ClassEditPayloadSchema = Joi.object({
  name: Joi.string().optional(),
  subjectId: Joi.string().optional(),
  day: Joi.string()
    .valid(...DAYS)
    .optional(),
  time: Joi.number().min(0).optional(),
});

export const ClassLecturerPayloadSchema = Joi.object({
  userIds: Joi.array().items(Joi.string()).min(1).required(),
});
