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

headFacultyRouter
  .route("/examiners/sk")
  .post(
    AuthorizationMiddleware.authorize([constants.FACULTY_ADMIN_GROUP_ACCESS]),
    HeadFacultyHandler.createExaminerSK
  );

export default headFacultyRouter;
