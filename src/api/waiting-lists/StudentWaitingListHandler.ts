import { NextFunction, Request, Response } from "express";
import { ITokenPayload } from "../../utils/interfaces/TokenPayload";
import { Validator } from "../../validator/Validator";
import { IPutStudentWaitingListAcceptanceStatus } from "../../utils/interfaces/StudentWaitingList";
import {
  RESPONSE_MESSAGE,
  createResponse,
  throwResultError,
  throwValidationError,
} from "../../utils";
import { StudentWaitingListService } from "../../services/StudentWaitingListService";
import { StudentWaitingListAcceptanceStatusPayloadSchema } from "../../validator/waiting-lists/StudentWaitingListSchema";

export class StudentWaitingListHandler {
  private validator: Validator;
  private studentWaitingListService: StudentWaitingListService;

  constructor() {
    this.studentWaitingListService = new StudentWaitingListService();
    this.validator = new Validator();

    this.putAcceptanceStatus = this.putAcceptanceStatus.bind(this);
  }

  async putAcceptanceStatus(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const payload: IPutStudentWaitingListAcceptanceStatus = req.body;
    const tokenPayload: ITokenPayload = res.locals.user;

    try {
      const validationResult = this.validator.validate(
        StudentWaitingListAcceptanceStatusPayloadSchema,
        payload
      );
      throwValidationError(validationResult);

      const result =
        await this.studentWaitingListService.accceptOrRejectStudentWaitingListById(
          tokenPayload.userId,
          id,
          payload
        );
      throwResultError(result);

      return res
        .status(200)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            "successfully accept or reject student"
          )
        );
    } catch (error) {
      return next(error);
    }
  }
}
