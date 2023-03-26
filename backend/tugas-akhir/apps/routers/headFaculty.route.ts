import express from "express";
import { HeadFacultyHandler } from "../handlers/headFaculty.handler";
import { AuthorizationMiddleware } from "../middlewares/auth/authorization.middleware";
import { constants } from "../utils/utils";

const headFacultyRouter = express.Router();

// * get approved thesis
headFacultyRouter
  .route("/thesis/approved")
  .get(
    AuthorizationMiddleware.authorize([constants.FACULTY_ADMIN_GROUP_ACCESS]),
    HeadFacultyHandler.getApprovedThesisHistory
  );

// * get approved thesis detail
headFacultyRouter
  .route("/thesis/approved/:thesisID")
  .get(
    AuthorizationMiddleware.authorize([constants.FACULTY_ADMIN_GROUP_ACCESS]),
    HeadFacultyHandler.getApprovedThesisDetail
  );

// * approve/reject krs and khs
headFacultyRouter
  .route("/thesis/approved/:thesisID/approve-krs-and-khs")
  .put(
    AuthorizationMiddleware.authorize([constants.FACULTY_ADMIN_GROUP_ACCESS]),
    HeadFacultyHandler.acceptOrRejectProposal
  );

// * create examiner sk
// * get all examiner sk
headFacultyRouter
  .route("/examiners/sk")
  .post(
    AuthorizationMiddleware.authorize([constants.FACULTY_ADMIN_GROUP_ACCESS]),
    HeadFacultyHandler.createExaminerSK
  )
  .get(
    AuthorizationMiddleware.authorize([constants.FACULTY_ADMIN_GROUP_ACCESS]),
    HeadFacultyHandler.getExaminerSK
  );

// * delete examiner sk
// * get examiner SK detail
headFacultyRouter
  .route("/examiners/sk/:SKID")
  .delete(
    AuthorizationMiddleware.authorize([constants.FACULTY_ADMIN_GROUP_ACCESS]),
    HeadFacultyHandler.deleteExaminerSK
  )
  .get(
    AuthorizationMiddleware.authorize([constants.FACULTY_ADMIN_GROUP_ACCESS]),
    HeadFacultyHandler.getExaminerSKDetail
  );

// * create supervisor sk
// * get all supervisor sk
headFacultyRouter
  .route("/supervisors/sk")
  .post(
    AuthorizationMiddleware.authorize([constants.FACULTY_ADMIN_GROUP_ACCESS]),
    HeadFacultyHandler.createSupervisorSK
  )
  .get(
    AuthorizationMiddleware.authorize([constants.FACULTY_ADMIN_GROUP_ACCESS]),
    HeadFacultyHandler.getSupervisorSK
  );

// * delete supervisor sk
// * get supervisor SK detail
headFacultyRouter
  .route("/supervisors/sk/:SKID")
  .delete(
    AuthorizationMiddleware.authorize([constants.FACULTY_ADMIN_GROUP_ACCESS]),
    HeadFacultyHandler.deleteSupervisorSK
  )
  .get(
    AuthorizationMiddleware.authorize([constants.FACULTY_ADMIN_GROUP_ACCESS]),
    HeadFacultyHandler.getSupervisorSKDetail
  );

headFacultyRouter
  .route("/sk")
  .get(
    AuthorizationMiddleware.authorize([constants.FACULTY_ADMIN_GROUP_ACCESS]),
    HeadFacultyHandler.getThesisWithSK
  );

headFacultyRouter
  .route("/exams")
  .get(
    AuthorizationMiddleware.authorize([constants.FACULTY_ADMIN_GROUP_ACCESS]),
    HeadFacultyHandler.getListOfUnverifiedExamProposal
  );

headFacultyRouter
  .route("/exams/history")
  .get(
    AuthorizationMiddleware.authorize([constants.FACULTY_ADMIN_GROUP_ACCESS]),
    HeadFacultyHandler.getHistoryOfExamProposal
  );

headFacultyRouter
  .route("/exams/:examID")
  .get(
    AuthorizationMiddleware.authorize([constants.FACULTY_ADMIN_GROUP_ACCESS]),
    HeadFacultyHandler.getUnverifiedExamProposalDetail
  )
  .put(
    AuthorizationMiddleware.authorize([constants.FACULTY_ADMIN_GROUP_ACCESS]),
    HeadFacultyHandler.acceptOrRejectExamProposal
  );

headFacultyRouter
  .route("/exam/seminars")
  .get(
    AuthorizationMiddleware.authorize([constants.FACULTY_ADMIN_GROUP_ACCESS]),
    HeadFacultyHandler.getSeminarExam
  );

headFacultyRouter
  .route("/exam/seminars/:seminarID")
  .get(
    AuthorizationMiddleware.authorize([constants.FACULTY_ADMIN_GROUP_ACCESS]),
    HeadFacultyHandler.getSeminarExamDetail
  )
  .delete(
    AuthorizationMiddleware.authorize([constants.FACULTY_ADMIN_GROUP_ACCESS]),
    HeadFacultyHandler.deleteSeminar
  );
// .get(
//   AuthorizationMiddleware.authorize([constants.FACULTY_ADMIN_GROUP_ACCESS]),
//   HeadFacultyHandler.getSupervisorSK
// );

export default headFacultyRouter;
