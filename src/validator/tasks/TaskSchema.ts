import Joi from "joi";

export const TaskPayloadSchema = Joi.object({
  name: Joi.string().optional(),
  attachments: Joi.array().items(Joi.string()).min(1).optional(),
  classId: Joi.string().required(),
  description: Joi.string().optional(),
  dueDate: Joi.number().min(0).required(),
});

export const TaskSubmissionPayloadSchema = Joi.object({
  description: Joi.string().optional(),
  taskId: Joi.string().required(),
});

export const TurnedInTaskSubmissionPayloadSchema = Joi.object({
  turnedIn: Joi.boolean().required(),
});

export const TaskSubmissionUpdatePayloadSchema = Joi.object({
  description: Joi.string().optional(),
});
