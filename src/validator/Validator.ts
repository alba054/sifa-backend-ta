import Joi from "joi";
import { constants, createErrorObject } from "../utils";

export class Validator {
  validate(schema: Joi.ObjectSchema, payload: any) {
    const validationResult = schema.validate(payload);

    if (validationResult.error) {
      return createErrorObject(
        400,
        validationResult.error.message,
        constants.VALIDATOR_ERROR
      );
    }

    return null;
  }
}
