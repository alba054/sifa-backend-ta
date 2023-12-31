import express from "express";
import { StudentHandler } from "../handlers/student.handler";
import { AuthenticationMiddleware } from "../middlewares/auth/authentication.middleware";
import { AuthorizationMiddleware } from "../middlewares/auth/authorization.middleware";
import { upload } from "../utils/storage";
import { constants } from "../utils/utils";

const studentRouter = express.Router();

// * get student's profile
// * update student's profile
studentRouter
  .route("/:nim")
  .get(
    AuthorizationMiddleware.authorize([
      constants.SUPERUSER_GROUP_ACCESS,
      constants.STUDENT_GROUP_ACCESS,
    ]),
    StudentHandler.getStudentProfile
  )
  .put(
    AuthorizationMiddleware.authorize([
      constants.SUPERUSER_GROUP_ACCESS,
      constants.STUDENT_GROUP_ACCESS,
    ]),
    StudentHandler.updateProfile
  );

// * get all reqlabs
// * create new lab free request
studentRouter
  .route("/:nim/reqlabs")
  .get(
    AuthorizationMiddleware.authorize([constants.STUDENT_GROUP_ACCESS]),
    StudentHandler.getRequestLabs
  )
  .post(
    AuthorizationMiddleware.authorize([constants.STUDENT_GROUP_ACCESS]),
    StudentHandler.requestLabFree
  );

// * delete reqlabs
// * update reqlabs
studentRouter
  .route("/:nim/reqlabs/:reqlabsID")
  .get(
    AuthorizationMiddleware.authorize([constants.STUDENT_GROUP_ACCESS]),
    StudentHandler.getReqLabDetail
  )
  .delete(
    AuthorizationMiddleware.authorize([constants.STUDENT_GROUP_ACCESS]),
    StudentHandler.deleteRequestLab
  )
  .put(
    AuthorizationMiddleware.authorize([constants.STUDENT_GROUP_ACCESS]),
    StudentHandler.editReqLabs
  );

// * create new thesis
// * get all thesis of a student
// * add query excludeProposalStatus=Belum_Diproses to get proposed Thesis history
studentRouter
  .route("/:nim/thesis")
  .post(
    AuthorizationMiddleware.authorize([constants.STUDENT_GROUP_ACCESS]),
    upload.array("files"),
    StudentHandler.postThesisProposal
  )
  .get(
    AuthorizationMiddleware.authorize([constants.STUDENT_GROUP_ACCESS]),
    StudentHandler.getAllProposedThesis
  );

// * delete thesis (only able if status is in process)
// * update thesis (only able if status is in process)
studentRouter
  .route("/:nim/thesis/:proposalGroupID")
  .delete(
    AuthorizationMiddleware.authorize([constants.STUDENT_GROUP_ACCESS]),
    StudentHandler.deleteProposedThesis
  )
  .put(
    AuthorizationMiddleware.authorize([constants.STUDENT_GROUP_ACCESS]),
    upload.array("files"),
    StudentHandler.updateProposedThesis
  );

// * view approved thesis detail
// * reupload KRS and KHS of approved thesis
studentRouter
  .route("/:nim/thesis/approved/:thesisID")
  .get(
    AuthorizationMiddleware.authorize([constants.STUDENT_GROUP_ACCESS]),
    StudentHandler.getThesisDetail
  )
  .put(
    AuthorizationMiddleware.authorize([constants.STUDENT_GROUP_ACCESS]),
    upload.array("files"),
    StudentHandler.reuploadKRSAndKHS
  );

studentRouter
  .route("/")
  .get(
    AuthenticationMiddleware.authenticate("admin"),
    StudentHandler.getAllStudents
  );

studentRouter
  .route("/:nim/seminars")
  .get(
    AuthorizationMiddleware.authorize([constants.STUDENT_GROUP_ACCESS]),
    StudentHandler.getSeminars
  )
  .post(
    AuthorizationMiddleware.authorize([constants.STUDENT_GROUP_ACCESS]),
    StudentHandler.requestSeminar
  );

studentRouter
  .route("/:nim/seminars/:seminarID")
  .post(
    AuthorizationMiddleware.authorize([constants.STUDENT_GROUP_ACCESS]),
    StudentHandler.provideSeminarDocument
  )
  .get(
    AuthorizationMiddleware.authorize([constants.STUDENT_GROUP_ACCESS]),
    StudentHandler.getSeminarDetail
  )
  .delete(
    AuthorizationMiddleware.authorize([constants.STUDENT_GROUP_ACCESS]),
    StudentHandler.deleteSeminar
  )
  .put(
    AuthorizationMiddleware.authorize([constants.STUDENT_GROUP_ACCESS]),
    StudentHandler.deleteSeminar
  );

studentRouter
  .route("/:nim/seminars/:seminarID/schedule")
  .post(
    AuthorizationMiddleware.authorize([constants.STUDENT_GROUP_ACCESS]),
    StudentHandler.scheduleFinalExam
  );

studentRouter
  .route("/:nim/exams")
  .post(
    AuthorizationMiddleware.authorize([constants.STUDENT_GROUP_ACCESS]),
    StudentHandler.requestExam
  )
  .get(
    AuthorizationMiddleware.authorize([constants.STUDENT_GROUP_ACCESS]),
    StudentHandler.getExamProposalDetail
  )
  .delete(
    AuthorizationMiddleware.authorize([constants.STUDENT_GROUP_ACCESS]),
    StudentHandler.deleteExamProposal
  );

export default studentRouter;
