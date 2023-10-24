import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../../exceptions/httpError/BadRequestError";
import { InternalServerError } from "../../exceptions/httpError/InternalServerError";
import { NotFoundError } from "../../exceptions/httpError/NotFoundError";
import { QuizService } from "../../services/QuizService";
import {
  convertEpochToDate,
  ERRORCODE,
  getTokenPayload,
  QUIZ_TYPE,
} from "../../utils";
import { ITokenPayload } from "../../utils/interfaces/TokenPayload";

export class QuizMiddleware {
  static async checkDueTime(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const tokenPayload: ITokenPayload = getTokenPayload(res);

    try {
      const quizService = new QuizService();

      const quiz = await quizService.getQuizById(tokenPayload.userId, id);

      if (quiz && "error" in quiz) {
        switch (quiz.error) {
          case 400:
            throw new BadRequestError(quiz.errorCode, quiz.message);
          case 404:
            throw new NotFoundError(quiz.errorCode, quiz.message);
          default:
            throw new InternalServerError(quiz.errorCode);
        }
      }

      if (
        Number(quiz.endDate) <
        convertEpochToDate(new Date().getTime(), 8).getTime()
      ) {
        return next(
          new BadRequestError(
            ERRORCODE.BAD_REQUEST_ERROR,
            "cannot submit it has reached the end date"
          )
        );
      }
    } catch (error) {
      return next(error);
    }
  }

  static checkQuizType(type: QUIZ_TYPE) {
    return async function authorizationHandler(
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      const tokenPayload: ITokenPayload = getTokenPayload(res);
      const { id } = req.params;

      try {
        const quizService = new QuizService();

        const quiz = await quizService.getQuizById(tokenPayload.userId, id);

        if (quiz && "error" in quiz) {
          switch (quiz.error) {
            case 400:
              throw new BadRequestError(quiz.errorCode, quiz.message);
            case 404:
              throw new NotFoundError(quiz.errorCode, quiz.message);
            default:
              throw new InternalServerError(quiz.errorCode);
          }
        }

        if (quiz.type !== type) {
          return next(
            new BadRequestError(
              ERRORCODE.BAD_REQUEST_ERROR,
              "this type is not compatible"
            )
          );
        }

        return next();
      } catch (error) {
        return next(error);
      }
    };
  }
}
