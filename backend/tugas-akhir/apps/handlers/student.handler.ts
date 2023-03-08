import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import dotenv from "dotenv";
import { StudentService } from "../services/student.service";
import { constants, createResponse } from "../utils/utils";
import { NotFoundError } from "@prisma/client/runtime";
import { IStudentUpdate } from "../utils/interfaces/student.interface";
import { BadRequestError } from "../utils/error/badrequestError";
import {
  ILabFree,
  ILabFreeUpdate,
} from "../utils/interfaces/labFree.interface";
import { LabFreeService } from "../services/labFree.service";
import { IThesis, IThesisPost } from "../utils/interfaces/thesis.interface";
import { ThesisService } from "../services/thesis.service";
import { decodeBase64 } from "../utils/decoder";
import {
  ISeminarDocumentPost,
  ISeminarSchedulePost,
} from "../utils/interfaces/seminar.interface";
import { IRequestExamDocumentPost } from "../utils/interfaces/exam.interface";

dotenv.config();

export class StudentHandler {
  static async scheduleFinalExam(
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
        typeof body.startTime === "undefined"
      ) {
        throw new BadRequestError(
          "provide endTime, place, seminarDate, startTime"
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

      await StudentService.createSeminarSchedule(Number(seminarID), body);

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

  static async deleteSeminar(req: Request, res: Response, next: NextFunction) {
    const { nim, seminarID } = req.params;

    try {
      await StudentService.deleteSeminar(nim, Number(seminarID));

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully delete exam proposal"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getSeminars(req: Request, res: Response, next: NextFunction) {
    const { nim } = req.params;

    const seminars = await StudentService.getSeminars(nim);

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "successfully delete exam proposal",
          seminars
        )
      );
  }

  static async deleteExamProposal(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { nim } = req.params;

    try {
      await StudentService.deleteExamProposal(nim);

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully delete exam proposal"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getExamProposalDetail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { nim } = req.params;

    try {
      const exam = await StudentService.getExamProposalDetail(nim);

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully get exam propsal detail",
            exam
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async requestExam(req: Request, res: Response, next: NextFunction) {
    const { nim } = req.params;
    const body = req.body as IRequestExamDocumentPost;
    const { username } = res.locals.user;

    try {
      if (typeof body.doc === "undefined") {
        throw new BadRequestError("provide doc");
      }

      if (!Array.isArray(body.doc) || body.doc.length < 1) {
        throw new BadRequestError("provide documents at least 1");
      }

      await StudentService.requestExam(nim, body, username);

      return res
        .status(201)
        .json(
          createResponse(constants.SUCCESS_MESSAGE, "successfully request exam")
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getSeminarDetail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { nim, seminarID } = req.params;

    try {
      const seminar = await StudentService.getSeminarDetail(
        nim,
        Number(seminarID)
      );

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully get seminar detail",
            seminar
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async provideSeminarDocument(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { username } = res.locals.user;
    const { nim, seminarID } = req.params;
    const body = req.body as ISeminarDocumentPost;

    try {
      if (typeof body.doc === "undefined") {
        throw new BadRequestError("provide doc");
      }

      if (!Array.isArray(body.doc) || body.doc.length < 1) {
        throw new BadRequestError("provide documents at least 1");
      }

      await StudentService.provideSeminarDocument(
        nim,
        Number(seminarID),
        body,
        username
      );

      return res
        .status(201)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully provide seminar document"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async requestSeminar(req: Request, res: Response, next: NextFunction) {
    const { nim } = req.params;

    const { seminarType } = req.body;

    try {
      if (typeof seminarType === "undefined") {
        throw new BadRequestError("provide seminarType");
      }

      await StudentService.requestSeminar(nim, seminarType);

      return res
        .status(201)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully request seminar"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getAllStudents(req: Request, res: Response, next: NextFunction) {
    // const { page, limit } = req.query;
    // // * pageInNumber : default 0
    // // * limitInNumber : default 10 items per page
    // const pageInNumber = typeof page === "undefined" ? 0 : Number(page);
    // let limitInNumber = typeof limit === "undefined" ? 10 : Number(limit);

    const students = await StudentService.getAllStudents();

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "successfully get all students",
          students
        )
      );
  }

  static async reuploadKRSAndKHS(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { nim, thesisID } = req.params;
    const { krs, khs } = req.body;

    try {
      if (typeof krs === "undefined" || typeof khs === "undefined") {
        throw new BadRequestError("provide krs and khs");
      }

      let title1 = uuidv4() + ".pdf";
      let title2 = uuidv4() + ".pdf";
      const path = `${constants.KRS_AND_KHS_PATH}/${nim}`; // * path to save krs and khs

      const krsBuffer = decodeBase64(krs);
      const khsBuffer = decodeBase64(khs);
      const KRSPath = `${path}/${title1}`;
      const KHSPath = `${path}/${title2}`;
      const updatedThesis = await StudentService.reuploadKRSAndKHS(
        path,
        krsBuffer,
        KRSPath,
        khsBuffer,
        KHSPath,
        nim,
        Number(thesisID)
      );

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully reupload KRS and KHS"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getThesisDetail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { nim, thesisID } = req.params;

    try {
      const thesis = await StudentService.getThesisDetail(
        nim,
        Number(thesisID)
      );

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully get thesis detail",
            thesis
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getReqLabDetail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { nim, reqlabsID } = req.params;

    const reqlab = await LabFreeService.getFreeLabRequestsByreqlabsID(
      nim,
      Number(reqlabsID)
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
  }

  static async updateProposedThesis(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { nim, proposalGroupID } = req.params;
    const body = req.body as IThesisPost;

    try {
      if (
        typeof body.title_1st === "undefined" ||
        typeof body.title_2nd === "undefined"
      ) {
        throw new BadRequestError("provide title_1st and title_2nd");
      }

      if (typeof req.files === "undefined") {
        throw new BadRequestError("provide files");
      }

      if (Array.isArray(req.files)) {
        if (req.files.length !== 2) {
          throw new BadRequestError("provide 2 files");
        }

        await ThesisService.editProposedThesis(
          body,
          nim,
          proposalGroupID,
          req.files[0].buffer,
          req.files[1].buffer
        );
      }
      return res
        .status(201)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully post new thesis proposal"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async deleteProposedThesis(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { nim, proposalGroupID } = req.params;

    try {
      await ThesisService.deleteThesis(nim, proposalGroupID);

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

  static async getAllProposedThesis(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { nim } = req.params;
    // * use one of the query params not both
    const { excludeProposalStatus, proposalStatus } = req.query;

    let thesis = await ThesisService.getAllProposedThesis(nim);

    // * if excludeProposalStatus = Belum_Diproses
    // * display history
    if (typeof excludeProposalStatus !== "undefined") {
      thesis = thesis.filter(
        (th) => th.statusPermohonan !== excludeProposalStatus
      );
    }

    // * if proposalStatus = "Belum_Diproses"
    // * display in unchecked thesis
    if (typeof proposalStatus !== "undefined") {
      thesis = thesis.filter((th) => th.statusPermohonan === proposalStatus);
    }

    // if (thesis.length > 1) {
    //   const temp = thesis[0];
    //   thesis[0] = thesis[1];
    //   thesis[1] = temp;
    // }
    // const temp = thesis[0];
    // thesis[0] = thesis[1];
    // thesis[1] = temp;

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "get all student's proposed thesis successfully",
          thesis
        )
      );
  }

  static async postThesisProposal(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { nim } = req.params;
    const body = req.body as IThesisPost;
    let title1 = uuidv4();
    let title2 = uuidv4();

    try {
      if (
        typeof body.title_1st === "undefined" ||
        typeof body.title_2nd === "undefined" ||
        typeof body.labID_1st === "undefined" ||
        typeof body.labID_2nd === "undefined" ||
        typeof body.krs === "undefined" ||
        typeof body.khs === "undefined"
      ) {
        throw new BadRequestError(
          "provide title_1st, title_2nd, labID_1st, labID_2nd, krs, khs"
        );
      }

      body.lecturerPropose_1st = Number(body.lecturerPropose_1st) || undefined;
      body.coLecturerPropose_1st =
        Number(body.coLecturerPropose_1st) || undefined;
      body.lecturerPropose_2nd = Number(body.lecturerPropose_2nd) || undefined;
      body.coLecturerPropose_2nd =
        Number(body.coLecturerPropose_2nd) || undefined;

      const proposalGroupID = uuidv4();
      const path = `${constants.KRS_AND_KHS_PATH}/${nim}`; // * path to save krs and khs

      // !UNUSED: used by multer
      // if (typeof req.files === "undefined") {
      //   throw new BadRequestError("provide files");
      // }

      // !UNUSED: extension is obtained from multer originalName property
      // title1 += "." + req.files[0].originalname.split(".")[1];
      // title2 += "." + req.files[1].originalname.split(".")[1];

      title1 += ".pdf";
      title2 += ".pdf";

      const krsBuffer = decodeBase64(body.krs);
      const khsBuffer = decodeBase64(body.khs);
      const KRSPath = `${path}/${title1}`;
      const KHSPath = `${path}/${title2}`;

      const thesis = [
        {
          studentNIM: nim,
          title: body.title_1st,
          KHSPath: KHSPath,
          KRSPath: KRSPath,
          labID: body.labID_1st,
          labID2: body.labID2_1st,
          lecturerPropose: Number(body.lecturerPropose_1st) || undefined,
          coLecturerPropose: Number(body.coLecturerPropose_1st) || undefined,
          proposalGroupID,
        } as IThesis,
        {
          studentNIM: nim,
          title: body.title_2nd,
          KHSPath: KHSPath,
          KRSPath: KRSPath,
          labID: body.labID_2nd,
          labID2: body.labID2_2nd,
          lecturerPropose: Number(body.lecturerPropose_2nd) || undefined,
          coLecturerPropose: Number(body.coLecturerPropose_2nd) || undefined,
          proposalGroupID,
        } as IThesis,
      ];

      await ThesisService.insertProposedThesis(
        thesis,
        path,
        title1,
        title2,
        krsBuffer,
        khsBuffer
      );

      // !UNUSED: uploaded using multer
      // if (Array.isArray(req.files)) {
      //   if (req.files.length !== 2) {
      //     throw new BadRequestError("provide 2 files");
      //   }

      //   title1 += "." + req.files[0].originalname.split(".")[1];
      //   title2 += "." + req.files[1].originalname.split(".")[1];

      //   const KRSPath = `${path}/${title1}`;
      //   const KHSPath = `${path}/${title2}`;

      //   const thesis = [
      //     {
      //       studentNIM: nim,
      //       title: body.title_1st,
      //       KHSPath: KHSPath,
      //       KRSPath: KRSPath,
      //       labID: body.labID_1st,
      //       labID2: body.labID2_1st,
      //       lecturerPropose: body.lecturerPropose_1st,
      //       proposalGroupID,
      //     } as IThesis,
      //     {
      //       studentNIM: nim,
      //       title: body.title_2nd,
      //       KHSPath: KHSPath,
      //       KRSPath: KRSPath,
      //       labID: body.labID_2nd,
      //       labID2: body.labID2_2nd,
      //       lecturerPropose: body.lecturerPropose_2nd,
      //       proposalGroupID,
      //     } as IThesis,
      //   ];

      //   await ThesisService.insertProposedThesis(
      //     thesis,
      //     path,
      //     title1,
      //     title2,
      //     req.files[0].buffer,
      //     req.files[1].buffer
      //   );
      // }

      return res
        .status(201)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully post new thesis proposal"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async editReqLabs(req: Request, res: Response, next: NextFunction) {
    // todo: edit request lab

    const { nim, reqlabsID } = req.params;
    const body = req.body as ILabFreeUpdate;

    try {
      if (typeof body.labID === "undefined") {
        throw new BadRequestError("provide labID");
      }

      await LabFreeService.editFreeLabByID(nim, Number(reqlabsID), body);

      return res
        .status(200)
        .json(
          createResponse(constants.SUCCESS_MESSAGE, "successfully updated")
        );
    } catch (error) {
      return next(error);
    }
  }

  static async deleteRequestLab(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    // todo: delete request lab by its id
    const { nim, reqlabsID } = req.params;

    try {
      await LabFreeService.deleteFreeLabByID(nim, Number(reqlabsID));

      return res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully delete freeLabRequest"
          )
        );
    } catch (error) {
      return next(error);
    }
  }
  static async getRequestLabs(req: Request, res: Response, next: NextFunction) {
    // todo: get all requests labs
    const { nim } = req.params;
    const labFreeReqs = await LabFreeService.getFreeLabRequestsByNIM(nim);

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "get all free lab requests successfully",
          labFreeReqs
        )
      );
  }

  static async requestLabFree(req: Request, res: Response, next: NextFunction) {
    // todo: post a new request to bebas lab

    const body = req.body as ILabFree;

    try {
      if (
        typeof body.labID === "undefined" ||
        typeof body.studentNIM === "undefined"
      ) {
        throw new BadRequestError("provide labID, studentNIM");
      }
      body.labID = Number(body.labID);
      const labFreeReq = await LabFreeService.insertNewLabFreeDoc(body);

      res
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

  static async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      // todo: update student's profile
      const { nim } = req.params;

      const updatedData = req.body as IStudentUpdate;

      if (
        typeof updatedData.birthDate !== "undefined" &&
        typeof updatedData.birthDate === "string"
      ) {
        if (!/[\d]{4}-[\d]{2}-[\d]{2}/.test(updatedData.birthDate)) {
          throw new BadRequestError("date format : YYYY-MM-DD");
        }

        updatedData.birthDate = new Date(updatedData.birthDate);
      }

      const updatedStudent = await StudentService.updateProfile(
        nim,
        updatedData
      );

      res
        .status(200)
        .json(
          createResponse(
            constants.SUCCESS_MESSAGE,
            "successfully update profile",
            updatedStudent
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  static async getStudentProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    // todo: student's profile
    const { nim } = req.params;
    console.log(nim);

    const student = await StudentService.getStudentByNIM(nim);
    // console.log(student);

    if (student === null) {
      return next(new NotFoundError("no student's found"));
    }

    return res
      .status(200)
      .json(
        createResponse(
          constants.SUCCESS_MESSAGE,
          "successfully get student's profile",
          student
        )
      );
  }
}
