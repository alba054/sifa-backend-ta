import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../../exceptions/httpError/BadRequestError";
import { ReferenceService } from "../../services/ReferenceService";
import {
  createResponse,
  ERRORCODE,
  RESPONSE_MESSAGE,
  throwResultError,
  throwValidationError,
} from "../../utils";
import { IPostReference } from "../../utils/interfaces/Reference";
import { ITokenPayload } from "../../utils/interfaces/TokenPayload";
import { ReferencePayloadSchema } from "../../validator/references/ReferenceSchema";
import { Validator } from "../../validator/Validator";

export class ReferenceHandler {
  private validator: Validator;
  private referenceService: ReferenceService;

  constructor() {
    this.validator = new Validator();
    this.referenceService = new ReferenceService();

    this.postReference = this.postReference.bind(this);
  }

  async postReference(req: Request, res: Response, next: NextFunction) {
    const tokenPayload: ITokenPayload = res.locals.user;
    const payload: IPostReference = req.body;

    try {
      if (!req.files) {
        throw new BadRequestError(ERRORCODE.BAD_REQUEST_ERROR, "provide files");
      }

      if (!req.files.length) {
        throw new BadRequestError(
          ERRORCODE.BAD_REQUEST_ERROR,
          "at least one file in files"
        );
      }

      const validationResult = this.validator.validate(
        ReferencePayloadSchema,
        payload
      );

      throwValidationError(validationResult);
      const testError = await this.referenceService.addNewReference(
        tokenPayload.userId,
        payload,
        req.files
      );
      throwResultError(testError);

      return res
        .status(201)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            "successfully add new reference to class"
          )
        );
    } catch (error) {
      return next(error);
    }
  }
}
