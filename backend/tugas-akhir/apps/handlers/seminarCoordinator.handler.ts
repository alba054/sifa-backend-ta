import { Request, Response, NextFunction } from "express";
import { SeminarCoordinatorService } from "../services/seminarCoordinator.service";
import { BadRequestError } from "../utils/error/badrequestError";
import { ISeminarSchedulePost } from "../utils/interfaces/seminar.interface";
import { ISeminarRefPost } from "../utils/interfaces/seminarRef.interface";
import { ISeminarScorePost } from "../utils/interfaces/seminarScore.interface";
import { constants, createResponse } from "../utils/utils";

export class SeminarCoordinatorHandler {
  static async getSeminarsByGroup(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { groupID } = req.params;

    const seminars = await SeminarCoordinatorService.getSeminarsByGroupID(
      groupID
    );

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "succesfully get seminars by groupID",
          seminars
        )
      );
  }

  static async scoreSeminarV2(req: Request, res: Response, next: NextFunction) {
    const { seminarID } = req.params;
    let { score, lecturerID } = req.body;

    try {
      if (typeof score === "undefined" || typeof lecturerID === "undefined") {
        throw new BadRequestError("provide score, lecturerID");
      }

      if (!Array.isArray(score)) {
        throw new BadRequestError("score must be array");
      }

      const opt = await SeminarCoordinatorService.scoreSeminarV2(
        Number(lecturerID),
        Number(seminarID),
        score
      );

      // if (typeof opt === "string") {
      //   throw new BadRequestError(opt);
      // }

      return res
        .status(201)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "succesfully give score to seminar"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async deleteRefItemHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { refID } = req.params;

    await SeminarCoordinatorService.deleteSeminarRef(Number(refID));
    try {
      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "succesfully delete seminar ref"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async putRefItemHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { refID } = req.params;
    const body = req.body as ISeminarRefPost;

    try {
      if (
        typeof body.max === "undefined" ||
        typeof body.min === "undefined" ||
        typeof body.status === "undefined" ||
        typeof body.type === "undefined" ||
        typeof body.weight === "undefined" ||
        typeof body.scoringType === "undefined"
      ) {
        throw new BadRequestError(
          "provide max, min, status, type, weight, scoringType"
        );
      }

      body.max = Number(body.max);
      body.min = Number(body.min);
      body.weight = Number(body.weight);

      await SeminarCoordinatorService.editSeminarRef(Number(refID), body);

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "succesfully put seminar ref"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async postRefItemHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const body = req.body as ISeminarRefPost;

    try {
      if (
        typeof body.max === "undefined" ||
        typeof body.min === "undefined" ||
        typeof body.status === "undefined" ||
        typeof body.type === "undefined" ||
        typeof body.weight === "undefined" ||
        typeof body.scoringType === "undefined"
      ) {
        throw new BadRequestError(
          "provide max, min, status, type, weight, scoringType"
        );
      }

      body.max = Number(body.max);
      body.min = Number(body.min);
      body.weight = Number(body.weight);

      await SeminarCoordinatorService.addSeminarRef(body);

      return res
        .status(201)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "succesfully post seminar ref"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getRefItemHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const references = await SeminarCoordinatorService.getReferencesItems();

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "succesfully get all references items",
          references
        )
      );
  }

  static async approveSeminarRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { seminarID } = req.params;
    const { isAccepted } = req.body;

    try {
      if (typeof isAccepted === "undefined") {
        throw new BadRequestError("provide isAccepted");
      }

      await SeminarCoordinatorService.approveSeminarRequest(
        Number(seminarID),
        Boolean(isAccepted)
      );

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "succesfully accept seminar request"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async scoreSeminar(req: Request, res: Response, next: NextFunction) {
    const { seminarID } = req.params;
    const { score, lecturerID } = req.body;

    try {
      if (typeof score === "undefined") {
        throw new BadRequestError("provide score");
      }

      await SeminarCoordinatorService.scoreSeminar(
        Number(lecturerID),
        Number(seminarID),
        Number(score)
      );

      return res
        .status(201)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "succesfully give score to seminar"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async deleteSeminarScoringAndEventLetter(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { seminarID } = req.params;

    try {
      await SeminarCoordinatorService.deleteSeminarScoringAndEventLetter(
        Number(seminarID)
      );

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "succesfully delete scoring and event letter"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async uploadScoringAndSeminarLetter(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { scoringLetterPath, eventLetterPath } = req.body;
    const { seminarID } = req.params;

    try {
      if (typeof scoringLetterPath === "undefined") {
        throw new BadRequestError("provide scoringLetterPath");
      }

      await SeminarCoordinatorService.provideScoringAndEventLetter(
        Number(seminarID),
        scoringLetterPath,
        eventLetterPath
      );

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "succesfully provide invitationLetter and approvalLetter"
          )
        );
    } catch (error) {
      return next(error);
    }
  }
  static async getSeminarEvaluationDetail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { seminarID } = req.params;

    try {
      const seminar =
        await SeminarCoordinatorService.getSeminarEvaluationDetail(
          Number(seminarID)
        );

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "succesfully get evaluation detail",
            seminar
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getSeminarEvaluation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const seminars = await SeminarCoordinatorService.getSeminarEvaluation();

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "succesfully get evaluations",
          seminars
        )
      );
  }

  static async uploadInvitationAndApprovalLetter(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { invitationPath, approvalPath, signature } = req.body;
    const { seminarID } = req.params;

    try {
      if (
        typeof invitationPath === "undefined" ||
        typeof approvalPath === "undefined" ||
        typeof signature === "undefined"
      ) {
        throw new BadRequestError(
          "provide invitationPath, approvalPath, signature"
        );
      }

      await SeminarCoordinatorService.provideInvitationAndApprovalLetter(
        Number(seminarID),
        invitationPath,
        approvalPath,
        signature
      );

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "succesfully provide invitationLetter and approvalLetter"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getScheduledSeminar(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { seminarID } = req.params;

    try {
      const seminar = await SeminarCoordinatorService.getScheduledSeminarDetail(
        Number(seminarID)
      );

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "succesfully get seminar detail",
            seminar
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getScheduledSeminars(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const scheduledSeminars =
      await SeminarCoordinatorService.getScheduledSeminars();

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "succesfully get scheduled seminars",
          scheduledSeminars
        )
      );
  }

  static async updateSeminarSchedule(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { seminarID } = req.params;
    const body = req.body as ISeminarSchedulePost;
    try {
      if (
        typeof body.endTime === "undefined" ||
        typeof body.place === "undefined" ||
        typeof body.seminarDate === "undefined" ||
        typeof body.startTime === "undefined" ||
        typeof body.groupID === "undefined"
      ) {
        throw new BadRequestError(
          "provide endTime, place, seminarDate, startTime, groupID"
        );
      }

      body.endTime = Number(body.endTime);
      body.seminarDate = Number(body.seminarDate);
      body.startTime = Number(body.startTime);

      // const datePattern = /[\d][\d]-[\d][\d]-[\d][\d][\d][\d]/;
      // const timePattern = /[\d][\d]:[\d][\d]/;

      // if (!datePattern.test(body.seminarDate)) {
      //   throw new BadRequestError("seminarDate format should be dd-mm-yyyy");
      // }

      // // const date = body.seminarDate.split("-");
      // // const startTime = body.startTime.split(":");
      // // const endTime = body.endTime.split(":");

      // if (
      //   !timePattern.test(body.startTime) ||
      //   !timePattern.test(body.endTime)
      // ) {
      //   throw new BadRequestError(
      //     "startTime and endTime format should be hh:mm"
      //   );
      // }

      await SeminarCoordinatorService.updateSeminarSchedule(
        Number(seminarID),
        body
      );

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "succesfully update seminar schedule"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async deleteSeminarSchedule(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { seminarID } = req.params;

    try {
      await SeminarCoordinatorService.deleteSeminarSchedule(Number(seminarID));

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "succesfully delete seminar schedule"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async createSeminarSchedule(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { seminarID } = req.params;
    const body = req.body as ISeminarSchedulePost;
    try {
      if (
        typeof body.place === "undefined" ||
        typeof body.seminarDate === "undefined" ||
        typeof body.startTime === "undefined" ||
        typeof body.groupID === "undefined"
      ) {
        throw new BadRequestError(
          "provide place, seminarDate, startTime, groupID"
        );
      }

      body.endTime = body.endTime ? Number(body.endTime) : 0;
      body.seminarDate = Number(body.seminarDate);
      body.startTime = Number(body.startTime);
      // const datePattern = /[\d][\d]-[\d][\d]-[\d][\d][\d][\d]/;
      // const timePattern = /[\d][\d]:[\d][\d]/;

      // if (!datePattern.test(body.seminarDate)) {
      //   throw new BadRequestError("seminarDate format should be dd-mm-yyyy");
      // }

      // // const date = body.seminarDate.split("-");
      // // const startTime = body.startTime.split(":");
      // // const endTime = body.endTime.split(":");

      // if (
      //   !timePattern.test(body.startTime) ||
      //   !timePattern.test(body.endTime)
      // ) {
      //   throw new BadRequestError(
      //     "startTime and endTime format should be hh:mm"
      //   );
      // }

      await SeminarCoordinatorService.createSeminarSchedule(
        Number(seminarID),
        body
      );

      return res
        .status(201)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "succesfully schedule seminar"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getSeminarRequests(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const seminars = await SeminarCoordinatorService.getSeminarRequests();

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "succesfully get seminars",
          seminars
        )
      );
  }
}
