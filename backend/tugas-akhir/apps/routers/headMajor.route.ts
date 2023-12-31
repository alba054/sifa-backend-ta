import express from "express";
import { HeadMajorHandler } from "../handlers/headMajor.handler";
import { AuthorizationMiddleware } from "../middlewares/auth/authorization.middleware";
import { HeadMajorMiddleware } from "../middlewares/headMajor.middleware";
import { constants } from "../utils/utils";

const headMajorRouter = express.Router();

// * view all proposed thesis
headMajorRouter
  .route("/thesis/proposed")
  .get(
    AuthorizationMiddleware.authorize([
      constants.VOCATION_ADMIN_GROUP_ACCESS,
      constants.HEAD_MAJOR_GROUP_ACCESS,
    ]),
    HeadMajorHandler.getListOfProposedThesis
  );

// * get approved thesis
headMajorRouter
  .route("/thesis/approved")
  .get(
    AuthorizationMiddleware.authorize([
      constants.VOCATION_ADMIN_GROUP_ACCESS,
      constants.HEAD_MAJOR_GROUP_ACCESS,
    ]),
    HeadMajorHandler.getApprovedThesisHistory
  );

// * get approved thesis
headMajorRouter
  .route("/thesis/approved/disposition")
  .get(
    AuthorizationMiddleware.authorize([
      constants.VOCATION_ADMIN_GROUP_ACCESS,
      constants.HEAD_MAJOR_GROUP_ACCESS,
    ]),
    HeadMajorHandler.getApprovedThesisDisposition
  );

headMajorRouter
  .route("/thesis")
  .get(
    AuthorizationMiddleware.authorize([
      constants.VOCATION_ADMIN_GROUP_ACCESS,
      constants.HEAD_MAJOR_GROUP_ACCESS,
    ]),
    HeadMajorHandler.getAllThesis
  );

// * delete thesisID
headMajorRouter
  .route("/thesis/:thesisID")
  .delete(
    AuthorizationMiddleware.authorize([
      constants.VOCATION_ADMIN_GROUP_ACCESS,
      constants.HEAD_MAJOR_GROUP_ACCESS,
    ]),
    HeadMajorHandler.deleteThesisByID
  )
  .put(
    AuthorizationMiddleware.authorize([
      constants.VOCATION_ADMIN_GROUP_ACCESS,
      constants.HEAD_MAJOR_GROUP_ACCESS,
    ]),
    HeadMajorHandler.assignThesisToDepartmentHead
  );

// * approve or reject proposed thesis
headMajorRouter
  .route("/thesis/:proposalGroupID/approve-thesis")
  .put(
    AuthorizationMiddleware.authorize([
      constants.VOCATION_ADMIN_GROUP_ACCESS,
      constants.HEAD_MAJOR_GROUP_ACCESS,
    ]),
    HeadMajorHandler.approveProposedThesis
  );

// * get approved thesis detail
// * create approval of approved thesis by headmajor
headMajorRouter
  .route("/thesis/approved/:id")
  .get(
    AuthorizationMiddleware.authorize([
      constants.VOCATION_ADMIN_GROUP_ACCESS,
      constants.HEAD_MAJOR_GROUP_ACCESS,
    ]),
    HeadMajorHandler.getApprovedThesisDetail
  )
  .post(
    AuthorizationMiddleware.authorize([
      constants.VOCATION_ADMIN_GROUP_ACCESS,
      constants.HEAD_MAJOR_GROUP_ACCESS,
    ]),
    HeadMajorHandler.createApprovalOfApprovedThesis
  );

// * assign lecturer as examiner
headMajorRouter
  .route("/thesis/approved/:thesisID/examiners")
  .post(
    AuthorizationMiddleware.authorize([
      constants.VOCATION_ADMIN_GROUP_ACCESS,
      constants.HEAD_MAJOR_GROUP_ACCESS,
      constants.DEPARTMENT_ADMIN_GROUP_ACCESS,
    ]),
    HeadMajorMiddleware.checkEligibilityToAssignExaminer,
    HeadMajorHandler.assignExaminers
  );

headMajorRouter
  .route("/examiners")
  .get(
    AuthorizationMiddleware.authorize([
      constants.VOCATION_ADMIN_GROUP_ACCESS,
      constants.HEAD_MAJOR_GROUP_ACCESS,
      constants.DEPARTMENT_ADMIN_GROUP_ACCESS,
    ]),
    HeadMajorHandler.getExaminersHistory
  );

headMajorRouter
  .route("/commitees/approved")
  .get(
    AuthorizationMiddleware.authorize([
      constants.VOCATION_ADMIN_GROUP_ACCESS,
      constants.HEAD_MAJOR_GROUP_ACCESS,
    ]),
    HeadMajorHandler.getApprovedExaminers
  );

headMajorRouter
  .route("/examiners/:examinerID")
  .put(
    AuthorizationMiddleware.authorize([
      constants.VOCATION_ADMIN_GROUP_ACCESS,
      constants.HEAD_MAJOR_GROUP_ACCESS,
    ]),
    HeadMajorHandler.approveExaminers
  );

headMajorRouter
  .route("/supervisors/:supervisorID")
  .put(
    AuthorizationMiddleware.authorize([
      constants.VOCATION_ADMIN_GROUP_ACCESS,
      constants.HEAD_MAJOR_GROUP_ACCESS,
    ]),
    HeadMajorHandler.approveSupervisors
  );

// * get dispositions
headMajorRouter
  .route("/dispositions")
  .get(
    AuthorizationMiddleware.authorize([
      constants.VOCATION_ADMIN_GROUP_ACCESS,
      constants.HEAD_MAJOR_GROUP_ACCESS,
    ]),
    HeadMajorHandler.getAllDispositions
  );

// * get disposition of approved thesis
// * delete disposition
headMajorRouter
  .route("/dispositions/:thesisID")
  .get(
    AuthorizationMiddleware.authorize([
      constants.VOCATION_ADMIN_GROUP_ACCESS,
      constants.HEAD_MAJOR_GROUP_ACCESS,
    ]),
    HeadMajorHandler.getDispositionOfApprovedThesis
  )
  .delete(
    AuthorizationMiddleware.authorize([
      constants.VOCATION_ADMIN_GROUP_ACCESS,
      constants.HEAD_MAJOR_GROUP_ACCESS,
    ]),
    HeadMajorHandler.deleteDispositionOfApprovedThesis
  );

headMajorRouter
  .route("/seminars/invited")
  .get(
    AuthorizationMiddleware.authorize([
      constants.VOCATION_ADMIN_GROUP_ACCESS,
      constants.HEAD_MAJOR_GROUP_ACCESS,
    ]),
    HeadMajorHandler.getExamSeminar
  );

headMajorRouter
  .route("/seminars/invited/:seminarID")
  .put(
    AuthorizationMiddleware.authorize([
      constants.VOCATION_ADMIN_GROUP_ACCESS,
      constants.HEAD_MAJOR_GROUP_ACCESS,
    ]),
    HeadMajorHandler.signExamSeminar
  );

export default headMajorRouter;
