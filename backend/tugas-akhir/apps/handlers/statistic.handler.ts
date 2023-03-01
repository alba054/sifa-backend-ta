import { Request, Response, NextFunction } from "express";
import { StatisticService } from "../services/statistic.service";
import { constants, createResponse } from "../utils/utils";

export class statisticHandler {
  static async getExaminerStatisticsByStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { status } = req.query;

    const statistics = await StatisticService.getExaminerStatisticsByStatus(
      status
    );

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "sucessfully get statistics",
          statistics
        )
      );
  }

  static async getSupervisorStatisticsByStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { status } = req.query;

    const statistics = await StatisticService.getSupervisorStatisticsByStatus(
      status
    );

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "sucessfully get statistics",
          statistics
        )
      );
  }

  static async getSupervisorStatisticsByPosition(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const statistics =
      await StatisticService.getSupervisorStatisticsByPosition();

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "sucessfully get statistics",
          statistics
        )
      );
  }
}
