import express from "express";
import { DocumentHandler } from "../handlers/doc.handler";
import { AuthorizationMiddleware } from "../middlewares/auth/authorization.middleware";
import { constants } from "../utils/utils";

const docRouter = express.Router();

docRouter
  .route("/students/free-lab/:reqLabID")
  .get(
    AuthorizationMiddleware.authorize([
      constants.STUDENT_GROUP_ACCESS,
      constants.LAB_ADMIN_GROUP_ACCESS,
      constants.ADMINHEAD_GROUP_ACCCESS,
      constants.SUBSECTIONHEAD_GROUP_ACCESS,
      constants.FACULTY_ADMIN_GROUP_ACCESS,
    ]),
    DocumentHandler.getFreeLabData
  );

docRouter
  .route("/students/sk/supervisors/:SKID")
  .get(
    AuthorizationMiddleware.authorize([
      constants.STUDENT_GROUP_ACCESS,
      constants.LAB_ADMIN_GROUP_ACCESS,
      constants.ADMINHEAD_GROUP_ACCCESS,
      constants.SUBSECTIONHEAD_GROUP_ACCESS,
      constants.FACULTY_ADMIN_GROUP_ACCESS,
      constants.DEAN_GROUP_ACCESS,
      constants.VOCATION_ADMIN_GROUP_ACCESS,
    ]),
    DocumentHandler.getSupervisorSKData
  );

docRouter
  .route("/students/sk/examiners/:SKID")
  .get(
    AuthorizationMiddleware.authorize([
      constants.STUDENT_GROUP_ACCESS,
      constants.LAB_ADMIN_GROUP_ACCESS,
      constants.ADMINHEAD_GROUP_ACCCESS,
      constants.SUBSECTIONHEAD_GROUP_ACCESS,
      constants.FACULTY_ADMIN_GROUP_ACCESS,
      constants.DEAN_GROUP_ACCESS,
      constants.VOCATION_ADMIN_GROUP_ACCESS,
    ]),
    DocumentHandler.getExaminerSKData
  );

docRouter
  .route("/students/seminars/:seminarID/approval")
  .get(
    AuthorizationMiddleware.authorize([
      constants.STUDENT_GROUP_ACCESS,
      constants.LAB_ADMIN_GROUP_ACCESS,
      constants.ADMINHEAD_GROUP_ACCCESS,
      constants.SUBSECTIONHEAD_GROUP_ACCESS,
      constants.FACULTY_ADMIN_GROUP_ACCESS,
      constants.DEAN_GROUP_ACCESS,
      constants.VOCATION_ADMIN_GROUP_ACCESS,
      constants.SEMINAR_COORDINATOR_GROUP_ACCESS,
      constants.LECTURER_GROUP_ACCESS,
    ]),
    DocumentHandler.getSeminarApprovalData
  );

docRouter
  .route("/students/seminars/:seminarID/event")
  .get(
    AuthorizationMiddleware.authorize([
      constants.STUDENT_GROUP_ACCESS,
      constants.LAB_ADMIN_GROUP_ACCESS,
      constants.ADMINHEAD_GROUP_ACCCESS,
      constants.SUBSECTIONHEAD_GROUP_ACCESS,
      constants.FACULTY_ADMIN_GROUP_ACCESS,
      constants.DEAN_GROUP_ACCESS,
      constants.VOCATION_ADMIN_GROUP_ACCESS,
      constants.SEMINAR_COORDINATOR_GROUP_ACCESS,
      constants.LECTURER_GROUP_ACCESS,
    ]),
    DocumentHandler.getSeminarLetterEventData
  );

docRouter
  .route("/students/seminars/:seminarID/invitation")
  .get(
    AuthorizationMiddleware.authorize([
      constants.STUDENT_GROUP_ACCESS,
      constants.LAB_ADMIN_GROUP_ACCESS,
      constants.ADMINHEAD_GROUP_ACCCESS,
      constants.SUBSECTIONHEAD_GROUP_ACCESS,
      constants.FACULTY_ADMIN_GROUP_ACCESS,
      constants.DEAN_GROUP_ACCESS,
      constants.VOCATION_ADMIN_GROUP_ACCESS,
      constants.SEMINAR_COORDINATOR_GROUP_ACCESS,
      constants.LECTURER_GROUP_ACCESS,
    ]),
    DocumentHandler.getSeminarInvitationData
  );

docRouter
  .route("/students/seminars/:seminarID/score")
  .get(
    AuthorizationMiddleware.authorize([
      constants.STUDENT_GROUP_ACCESS,
      constants.LAB_ADMIN_GROUP_ACCESS,
      constants.ADMINHEAD_GROUP_ACCCESS,
      constants.SUBSECTIONHEAD_GROUP_ACCESS,
      constants.FACULTY_ADMIN_GROUP_ACCESS,
      constants.DEAN_GROUP_ACCESS,
      constants.VOCATION_ADMIN_GROUP_ACCESS,
      constants.SEMINAR_COORDINATOR_GROUP_ACCESS,
      constants.LECTURER_GROUP_ACCESS,
    ]),
    DocumentHandler.getSeminarScoreLetterData
  );

docRouter
  .route("/students/exams/:examID")
  .get(
    AuthorizationMiddleware.authorize([
      constants.STUDENT_GROUP_ACCESS,
      constants.LAB_ADMIN_GROUP_ACCESS,
      constants.ADMINHEAD_GROUP_ACCCESS,
      constants.SUBSECTIONHEAD_GROUP_ACCESS,
      constants.FACULTY_ADMIN_GROUP_ACCESS,
      constants.DEAN_GROUP_ACCESS,
      constants.VOCATION_ADMIN_GROUP_ACCESS,
      constants.SEMINAR_COORDINATOR_GROUP_ACCESS,
      constants.LECTURER_GROUP_ACCESS,
    ]),
    DocumentHandler.getExamProposalDocumentData
  );

export default docRouter;
