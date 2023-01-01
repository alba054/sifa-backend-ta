import { NextFunction, Response, Request } from "express";
import { HeadLabService } from "../services/headLab.service";
import { BadRequestError } from "../utils/error/badrequestError";
import { NotFoundError } from "../utils/error/notFoundError";
import { constants, createResponse } from "../utils/utils";

interface ISupervisorBodyPost {
  lecturerID: number;
  position: "Utama" | "Pendamping";
}

export class HeadLabHandler {
  static async assignSupervisor(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { labID } = res.locals.user;
    const { thesisID } = req.params;
    const body = req.body as ISupervisorBodyPost;

    try {
      if (
        typeof body.lecturerID === "undefined" ||
        typeof body.position === "undefined"
      ) {
        throw new BadRequestError("provide lecturerID and position");
      }

      const assignedThesis = await HeadLabService.assignSupervisor(
        Number(thesisID),
        labID,
        body
      );

      return res
        .status(201)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully assign supervisor"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getDispositions(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { labID } = res.locals.user;
    let dispositions = await HeadLabService.getDisposition();

    dispositions = dispositions.filter(
      (disposition) =>
        disposition.tugas_akhir.taLabId === labID ||
        disposition.tugas_akhir.taLabId2 === labID
    );

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "successfully get all dispositions",
          dispositions
        )
      );
  }

  static async getDispositionDetail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { labID } = res.locals.user;
    const { thesisID } = req.params;
    const thesisDisposition = await HeadLabService.getThesisDispositionDetail(
      Number(thesisID)
    );

    if (
      thesisDisposition === null ||
      (thesisDisposition?.tugas_akhir.taLabId !== labID &&
        thesisDisposition?.tugas_akhir.taLabId2 !== labID)
    ) {
      return next(new NotFoundError("thesis is not found"));
    }

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "successfully get disposition's detail",
          thesisDisposition
        )
      );
  }

  static async getAllApprovedThesis(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { labID } = res.locals.user;
    let approvedThesis = await HeadLabService.getApprovedThesis(labID);

    console.log(labID);

    approvedThesis = approvedThesis.filter(
      (thesis) => thesis.taLabId === labID || thesis.taLabId2 === labID
    );

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "successfully get all approved thesis",
          approvedThesis
        )
      );
  }

  static async getDetailThesis(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { labID } = res.locals.user;
    const { thesisID } = req.params;
    const thesis = await HeadLabService.getThesisDetail(Number(thesisID));
    console.log(thesis);

    if (
      typeof thesis === "undefined" ||
      (thesis?.taLabId !== labID && thesis?.taLabId2 !== labID)
    ) {
      return next(new NotFoundError("thesis is not found"));
    }

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "successfully get approved thesis's detail",
          thesis
        )
      );
  }
}
