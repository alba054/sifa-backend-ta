import express from "express";
import { ViceDeanHandler } from "../handlers/viceDean.handler";
import { AuthorizationMiddleware } from "../middlewares/auth/authorization.middleware";
import { constants } from "../utils/utils";

const viceDeanRouter = express.Router();

viceDeanRouter
  .route("/exams")
  .get(
    AuthorizationMiddleware.authorize([constants.VICE_DEAN_GROUP_ACCESS]),
    ViceDeanHandler.getExamProposals
  );

viceDeanRouter
  .route("/exams/history")
  .get(
    AuthorizationMiddleware.authorize([constants.VICE_DEAN_GROUP_ACCESS]),
    ViceDeanHandler.getSignedExamProposal
  );

viceDeanRouter
  .route("/exams/history/:examID")
  .delete(
    AuthorizationMiddleware.authorize([constants.VICE_DEAN_GROUP_ACCESS]),
    ViceDeanHandler.unsignedExamProposal
  );

viceDeanRouter
  .route("/exams/:examID")
  .get(
    AuthorizationMiddleware.authorize([constants.VICE_DEAN_GROUP_ACCESS]),
    ViceDeanHandler.getExamProposalDetail
  )
  .put(
    AuthorizationMiddleware.authorize([constants.VICE_DEAN_GROUP_ACCESS]),
    ViceDeanHandler.signeExamProposal
  );

viceDeanRouter
  .route("/verifications/:SKID")
  .get(
    AuthorizationMiddleware.authorize([constants.VICE_DEAN_GROUP_ACCESS]),
    ViceDeanHandler.getVerificationSKDetail
  )
  .put(
    AuthorizationMiddleware.authorize([constants.VICE_DEAN_GROUP_ACCESS]),
    ViceDeanHandler.verifyVerificationSK
  );

viceDeanRouter
  .route("/sk")
  .get(
    AuthorizationMiddleware.authorize([constants.ADMINHEAD_GROUP_ACCCESS]),
    ViceDeanHandler.getThesisWithSK
  );

viceDeanRouter
  .route("/sk/:thesisID")
  .get(
    AuthorizationMiddleware.authorize([constants.ADMINHEAD_GROUP_ACCCESS]),
    ViceDeanHandler.getThesisSKDetail
  );

viceDeanRouter
  .route("/examiners/sk/:SKID")
  .get(
    AuthorizationMiddleware.authorize([constants.ADMINHEAD_GROUP_ACCCESS]),
    ViceDeanHandler.getExaminerSKDetail
  )
  .put(
    AuthorizationMiddleware.authorize([constants.ADMINHEAD_GROUP_ACCCESS]),
    ViceDeanHandler.acceptOrRejectExaminerSK
  );

viceDeanRouter
  .route("/supervisors/sk/:SKID")
  .get(
    AuthorizationMiddleware.authorize([constants.ADMINHEAD_GROUP_ACCCESS]),
    ViceDeanHandler.getSupervisorSKDetail
  )
  .put(
    AuthorizationMiddleware.authorize([constants.ADMINHEAD_GROUP_ACCCESS]),
    ViceDeanHandler.acceptOrRejectSupervisorSK
  );

export default viceDeanRouter;
