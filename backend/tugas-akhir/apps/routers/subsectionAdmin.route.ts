import express from "express";
import { HeadFacultyHandler } from "../handlers/headFaculty.handler";
import { SubsectionAdminHandler } from "../handlers/subsectionAdmin.handler";
import { AuthorizationMiddleware } from "../middlewares/auth/authorization.middleware";
import { constants } from "../utils/utils";

const subsectionAdminRouter = express.Router();

// * get thesis with complete sk (both examiner and supervisor sk exist)
subsectionAdminRouter
  .route("/sk")
  .get(
    AuthorizationMiddleware.authorize([constants.SUBSECTIONHEAD_GROUP_ACCESS]),
    SubsectionAdminHandler.getThesisWithSK
  );

subsectionAdminRouter
  .route("/sk/:thesisID")
  .get(
    AuthorizationMiddleware.authorize([constants.SUBSECTIONHEAD_GROUP_ACCESS]),
    SubsectionAdminHandler.getThesisSKDetail
  );

// * get examiner sk detail
// * accept or reject examiner sk
subsectionAdminRouter
  .route("/examiners/sk/:SKID")
  .get(
    AuthorizationMiddleware.authorize([constants.SUBSECTIONHEAD_GROUP_ACCESS]),
    SubsectionAdminHandler.getExaminerSKDetail
  )
  .put(
    AuthorizationMiddleware.authorize([constants.SUBSECTIONHEAD_GROUP_ACCESS]),
    SubsectionAdminHandler.acceptOrRejectExaminerSK
  );

// * get supervisor sk detail
// * accept or reject supervisor sk
subsectionAdminRouter
  .route("/supervisors/sk/:SKID")
  .get(
    AuthorizationMiddleware.authorize([constants.SUBSECTIONHEAD_GROUP_ACCESS]),
    SubsectionAdminHandler.getSupervisorSKDetail
  )
  .put(
    AuthorizationMiddleware.authorize([constants.SUBSECTIONHEAD_GROUP_ACCESS]),
    SubsectionAdminHandler.acceptOrRejectSupervisorSK
  );

subsectionAdminRouter
  .route("/exams")
  .get(
    AuthorizationMiddleware.authorize([constants.SUBSECTIONHEAD_GROUP_ACCESS]),
    SubsectionAdminHandler.getListOfUnvalidatedExamProposal
  );

subsectionAdminRouter
  .route("/exams/history")
  .get(
    AuthorizationMiddleware.authorize([constants.SUBSECTIONHEAD_GROUP_ACCESS]),
    SubsectionAdminHandler.getHistoryOfExamProposal
  );

subsectionAdminRouter
  .route("/exams/:examID")
  .get(
    AuthorizationMiddleware.authorize([constants.SUBSECTIONHEAD_GROUP_ACCESS]),
    SubsectionAdminHandler.getUnvalidatedExamProposalDetail
  )
  .put(
    AuthorizationMiddleware.authorize([constants.SUBSECTIONHEAD_GROUP_ACCESS]),
    SubsectionAdminHandler.acceptOrRejectExamProposal
  );

export default subsectionAdminRouter;
