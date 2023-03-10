import { NextFunction, Response, Request } from "express";
import { LabLetter } from "../models/labLetter.model";
import { HeadLabService } from "../services/headLab.service";
import { LabFreeService } from "../services/labFree.service";
import { BadRequestError } from "../utils/error/badrequestError";
import { NotFoundError } from "../utils/error/notFoundError";
import { ILabFree } from "../utils/interfaces/labFree.interface";
import { ILabLetterPost } from "../utils/interfaces/labLetter.interface";
import { constants, createResponse } from "../utils/utils";

interface ISupervisorBodyPost {
  lecturerID: number;
  position: "Utama" | "Pendamping";
}

export class HeadLabHandler {
  static async deleteLabLetter(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { labID } = res.locals.user;
    const { labLetterID } = req.params;

    try {
      await HeadLabService.deleteLabLetter(Number(labID), Number(labLetterID));

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully delete lab letter"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async editLabLetter(req: Request, res: Response, next: NextFunction) {
    const { labID } = res.locals.user;
    const { labLetterID } = req.params;
    const body = req.body as ILabLetterPost;

    try {
      if (typeof body.refLetterID === "undefined") {
        throw new BadRequestError("provide refLetterID");
      }

      await HeadLabService.editLabLetter(
        Number(labID),
        Number(labLetterID),
        body
      );

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully edit lab letter"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getLabLetterDetail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { labID } = res.locals.user;
    const { labLetterID } = req.params;

    try {
      const labLetter = await HeadLabService.getLabLetterDetail(
        Number(labID),
        Number(labLetterID)
      );

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully get lab letter",
            labLetter
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getLabLetters(req: Request, res: Response, next: NextFunction) {
    const { labID } = res.locals.user;
    const { search } = req.query;

    const labLetters = await HeadLabService.getLabLettersByLabID(
      Number(labID),
      search
    );

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "successfully get lab letters",
          labLetters
        )
      );
  }

  static async createLabLetter(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { labID } = res.locals.user;
    const body = req.body as ILabLetterPost;

    try {
      if (typeof body.refLetterID === "undefined") {
        throw new BadRequestError("provide refLetterID");
      }

      await HeadLabService.createLabLetter(Number(labID), body);

      return res
        .status(201)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully create lab letter"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getRequestLabDetail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { labID } = res.locals.user;
    const { reqLabID } = req.params;

    try {
      const reqlab = await HeadLabService.getReqLabDetail(
        Number(reqLabID),
        Number(labID)
      );

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully get reqlab detail",
            reqlab
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async acceptOrRejectRequestLab(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { reqLabID } = req.params;
    const { labID } = res.locals.user;
    const { isAccepted, resolveDate, signature } = req.body;

    try {
      if (
        typeof isAccepted === "undefined" ||
        typeof signature === "undefined"
      ) {
        throw new BadRequestError("provide isAccepted and signature");
      }

      await HeadLabService.acceptOrRejectRequestLab(
        Number(reqLabID),
        Number(labID),
        Boolean(isAccepted),
        resolveDate,
        signature
      );

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully accept/reject"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async createNewReqLabs(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { labID } = res.locals.user;
    const { studentNIM } = req.body;

    try {
      if (typeof studentNIM === "undefined") {
        throw new BadRequestError("provide studentNIM");
      }

      const body = {
        labID,
        studentNIM,
      } as ILabFree;

      const labFreeReq = await LabFreeService.insertNewLabFreeDoc(body);

      return res
        .status(201)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "create new lab free request successfully",
            labFreeReq
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getReqLabsByLabID(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { labID } = res.locals.user;
    const { search } = req.query;

    const reqlabs = await HeadLabService.getReqLabsByLabID(
      Number(labID),
      search
    );

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "successfully view all requests free lab",
          reqlabs
        )
      );
  }

  static async viewAssignedSupervisorsHistory(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { status } = req.query;

    const supervisors = await HeadLabService.viewSupervisorsHistory(status);

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "successfully view supervisors history",
          supervisors
        )
      );
  }

  static async getSupervisorDetail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { supervisorID } = req.params;

    const supervisor = await HeadLabService.getSupervisorDetail(
      Number(supervisorID)
    );

    if (supervisor === null) {
      return next(new NotFoundError("supervisor is not found"));
    }

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "successfully get supervisor detail",
          supervisor
        )
      );
  }

  static async getSupervisorsOfThesis(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { thesisID } = req.params;

    const supervisors = await HeadLabService.getSupervisorOfThesis(
      Number(thesisID)
    );

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "successfully get thesis's supervisors history",
          supervisors
        )
      );
  }

  static async removeSupervisor(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { supervisorID } = req.params;

    try {
      await HeadLabService.removeSupervisor(Number(supervisorID));

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully remove supervisor"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async editSupervisor(req: Request, res: Response, next: NextFunction) {
    const { supervisorID } = req.params;

    const { lecturerID } = req.body as ISupervisorBodyPost;

    try {
      if (typeof lecturerID === "undefined") {
        throw new BadRequestError("provide lecturerID and position");
      }

      const assignedSupervisor = await HeadLabService.editSupervisor(
        Number(supervisorID),
        lecturerID
      );

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully edit supervisor"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

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
        Number(labID),
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
    const { title } = req.query;
    let approvedThesis = await HeadLabService.getApprovedThesis(labID, title);

    // console.log(labID);

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
    // console.log(thesis);

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
