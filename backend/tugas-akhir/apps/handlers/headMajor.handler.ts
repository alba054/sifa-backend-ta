import { NextFunction, Request, Response } from "express";

import dotenv from "dotenv";
import { constants, createResponse } from "../utils/utils";
import { ThesisService } from "../services/thesis.service";
import { BadRequestError } from "../utils/error/badrequestError";
import { ThesisHeadMajorDispositionService } from "../services/thesisHeadMajorDisposition.service";
import { NotFoundError } from "../utils/error/notFoundError";
import { HeadMajorService } from "../services/headMajor.service";
import { User } from "../models/user.model";

dotenv.config();

interface IThesisApproval {
  id: number;
  isApproved: boolean;
  note?: string;
}

interface IBody {
  title1: IThesisApproval;
  title2: IThesisApproval;
}

interface IHeadMajorApproval {
  thesisID: number;
  departmentName: string;
}

interface IAssignedExaminer {
  position: number;
  lecturerID: number;
}

export class HeadMajorHandler {
  static async signExamSeminar(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { seminarID } = req.params;
    const { signature } = req.body;

    try {
      await HeadMajorService.signExamSeminar(Number(seminarID), signature);

      return res
        .status(200)
        .json(
          createResponse(constants.SUCCESS_MESSAGE, "successfully sign seminar")
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getExamSeminar(req: Request, res: Response, next: NextFunction) {
    const exams = await HeadMajorService.getExamSeminars();

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "successfully get seminars exam",
          exams
        )
      );
  }

  static async approveSupervisors(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { supervisorID } = req.params;
    const { isAccepted } = req.body;

    try {
      await HeadMajorService.approveSupervisor(
        Number(supervisorID),
        Boolean(isAccepted)
      );

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully approve/reject supervisor"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getApprovedExaminers(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const examiners = await HeadMajorService.getThesisWithAcceptedExaminers();

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "successfully get thesis with accepted examiners",
          examiners
        )
      );
  }

  static async approveExaminers(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { examinerID } = req.params;
    const { isAccepted } = req.body;

    try {
      await HeadMajorService.approveExaminer(
        Number(examinerID),
        Boolean(isAccepted)
      );

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully approve/reject examiner"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getApprovedThesisDisposition(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { vocationID } = res.locals.user;
      const { status } = req.query;

      const approvedThesis =
        await ThesisService.getApprovedThesisDispositionByHeadMajor(
          vocationID,
          status
        );

      const uniqueNIM: string[] = [];

      // todo: separate thesis by student's nim
      for (const thesis of approvedThesis) {
        if (!uniqueNIM.includes(thesis.taMhsNim)) {
          uniqueNIM.push(thesis.taMhsNim);
        }
      }

      const response: any[] = [];
      for (const nim of uniqueNIM) {
        const studentThesis = approvedThesis.filter(
          (thesis) => thesis.taMhsNim === nim
        );

        const headDepartment = await User.getUserByBadge(
          constants.DEPARTMENT_ADMIN_GROUP_ACCESS
        );
        response.push({
          NIM: nim,
          headDepartmentName: headDepartment?.name,
          headDepartmentNIP: headDepartment?.username,
          data: studentThesis,
        });
      }

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully get all approved thesis",
            response
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async assignThesisToDepartmentHead(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { thesisID } = req.params;
    const { departmentHead } = req.body;

    try {
      if (typeof departmentHead === "undefined") {
        throw new BadRequestError("provide departmentHead");
      }

      await HeadMajorService.assignThesisToDepartmentHead(
        Number(thesisID),
        departmentHead
      );

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully assign department head"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async deleteThesisByID(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { thesisID } = req.params;
    try {
      await HeadMajorService.deleteThesisByID(Number(thesisID));

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully delete thesis"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getAllDispositions(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const dispositions = await HeadMajorService.getAllDispositions();

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "successfully view dispositions history",
          dispositions
        )
      );
  }

  static async getAllThesis(req: Request, res: Response, next: NextFunction) {
    const { status } = req.query;
    const thesis = await HeadMajorService.getAllThesis(status);

    const uniqueNIM: string[] = [];

    // todo: separate thesis by student's nim
    for (const t of thesis) {
      if (!uniqueNIM.includes(t.taMhsNim)) {
        uniqueNIM.push(t.taMhsNim);
      }
    }

    const response: any[] = [];
    for (const nim of uniqueNIM) {
      const accepted: any[] = [];
      const rejected: any[] = [];
      const inprocess: any[] = [];
      const studentThesis = thesis.filter((t) => t.taMhsNim === nim);
      const name = studentThesis[0].mahasiswa.mhsNama;

      studentThesis.forEach((t) => {
        if (t.statusPermohonan === "Diterima") {
          accepted.push(t);
        } else if (t.statusPermohonan === "Ditolak") {
          rejected.push(t);
        } else {
          inprocess.push(t);
        }
      });

      response.push({
        NIM: nim,
        nama: name,
        data: {
          accepted,
          rejected,
          inprocess,
        },
      });
    }

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "successfully get all thesis history",
          response
        )
      );
  }

  static async getExaminersHistory(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { status } = req.query;

    const examiners = await HeadMajorService.viewExaminersHistory(status);

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "successfully view examiners history",
          examiners
        )
      );
  }

  static async assignExaminers(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { thesisID } = req.params;
    try {
      const body = req.body as IAssignedExaminer;

      if (
        typeof body.position === "undefined" ||
        typeof body.lecturerID === "undefined"
      ) {
        throw new BadRequestError("provide lecturerID and position");
      }

      const assignedExaminers = await HeadMajorService.assignExaminer(
        Number(thesisID),
        body
      );

      return res
        .status(201)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully assign new examiner"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async deleteDispositionOfApprovedThesis(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { thesisID } = req.params;

    try {
      const thesisDisposition =
        await ThesisHeadMajorDispositionService.deleteDispositionOfApprovedThesis(
          Number(thesisID)
        );

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully remove disposition"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getDispositionOfApprovedThesis(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { thesisID } = req.params;

    const thesisDisposition =
      await ThesisHeadMajorDispositionService.getDispositionOfApprovedThesis(
        Number(thesisID)
      );

    if (thesisDisposition === null) {
      return next(new NotFoundError("disposition is not found"));
    }

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "successfully get disposition",
          thesisDisposition
        )
      );
  }

  static async createApprovalOfApprovedThesis(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    const { departmentName } = req.body;

    try {
      if (typeof departmentName === "undefined") {
        throw new BadRequestError("provide departmentName");
      }
      const body = {
        thesisID: Number(id),
        departmentName,
      } as IHeadMajorApproval;

      const thesisDisposition =
        await ThesisHeadMajorDispositionService.createDisposition(body);

      return res
        .status(201)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully create disposition"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getApprovedThesisDetail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;

    const approvedThesis = await ThesisService.getApprovedThesisDetail(
      Number(id)
    );

    if (typeof approvedThesis === "undefined") {
      return next(new NotFoundError("approved thesis is not found"));
    }

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "successfully get approved thesis detail",
          approvedThesis
        )
      );
  }

  static async approveProposedThesis(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { proposalGroupID } = req.params;
    const body = req.body as IBody;

    try {
      const { vocationID } = res.locals.user;

      if (
        typeof body.title1 === "undefined" ||
        typeof body.title2 === "undefined"
      ) {
        throw new BadRequestError("provide title1 and title2");
      }

      // ! this approve both of proposed thesis which is invalid
      if (body.title1.isApproved && body.title2.isApproved) {
        throw new BadRequestError("approve only one title");
      }

      await ThesisService.approveOrRejectProposedThesis(proposalGroupID, body);

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully update proposed thesis status"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getApprovedThesisHistory(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { vocationID } = res.locals.user;
      const { status } = req.query;

      const approvedThesis = await ThesisService.getApprovedThesisByHeadMajor(
        vocationID,
        status
      );

      const uniqueNIM: string[] = [];

      // todo: separate thesis by student's nim
      for (const thesis of approvedThesis) {
        if (!uniqueNIM.includes(thesis.taMhsNim)) {
          uniqueNIM.push(thesis.taMhsNim);
        }
      }

      const response: any[] = [];
      for (const nim of uniqueNIM) {
        const studentThesis = approvedThesis.filter(
          (thesis) => thesis.taMhsNim === nim
        );

        const headDepartment = await User.getUserByBadge(
          constants.DEPARTMENT_ADMIN_GROUP_ACCESS
        );
        response.push({
          NIM: nim,
          headDepartmentName: headDepartment?.name,
          headDepartmentNIP: headDepartment?.username,
          data: studentThesis,
        });
      }

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully get all approved thesis",
            response
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  // * will get based on head major vocation id
  // * id will be obtained in token
  static async getListOfProposedThesis(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { vocationID } = res.locals.user;

      const proposedThesis = await ThesisService.getProposedThesisByHeadMajor(
        vocationID
      );

      const uniqueNIM: string[] = [];

      // todo: separate thesis by student's nim
      for (const thesis of proposedThesis) {
        if (!uniqueNIM.includes(thesis.taMhsNim)) {
          uniqueNIM.push(thesis.taMhsNim);
        }
      }

      const response: any[] = [];
      for (const nim of uniqueNIM) {
        const studentThesis = proposedThesis.filter(
          (thesis) => thesis.taMhsNim === nim
        );
        if (studentThesis.length < 2) {
          continue;
        }
        response.push({
          NIM: nim,
          data: studentThesis,
        });
      }

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully get all proposed thesis",
            response
          )
        );
    } catch (error) {
      return next(error);
    }
  }
}
