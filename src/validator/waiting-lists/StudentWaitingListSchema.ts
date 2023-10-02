import Joi from "joi";

export const StudentWaitingListAcceptanceStatusPayloadSchema = Joi.object({
  status: Joi.boolean().required(),
});
