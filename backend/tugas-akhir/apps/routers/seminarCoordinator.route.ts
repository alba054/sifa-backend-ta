import express from "express";
import { SeminarCoordinatorHandler } from "../handlers/seminarCoordinator.handler";
import { AuthorizationMiddleware } from "../middlewares/auth/authorization.middleware";
import { constants } from "../utils/utils";

const seminarCoordinatorRouter = express.Router();

seminarCoordinatorRouter
  .route("/seminars")
  .get(
    AuthorizationMiddleware.authorize([
      constants.SEMINAR_COORDINATOR_GROUP_ACCESS,
    ]),
    SeminarCoordinatorHandler.getSeminarRequests
  );

seminarCoordinatorRouter
  .route("/seminars/scheduled")
  .get(
    AuthorizationMiddleware.authorize([
      constants.SEMINAR_COORDINATOR_GROUP_ACCESS,
    ]),
    SeminarCoordinatorHandler.getScheduledSeminars
  );

seminarCoordinatorRouter
  .route("/seminars/scheduled/:seminarID")
  .get(
    AuthorizationMiddleware.authorize([
      constants.SEMINAR_COORDINATOR_GROUP_ACCESS,
    ]),
    SeminarCoordinatorHandler.getScheduledSeminar
  )
  .put(
    AuthorizationMiddleware.authorize([
      constants.SEMINAR_COORDINATOR_GROUP_ACCESS,
    ]),
    SeminarCoordinatorHandler.uploadInvitationAndApprovalLetter
  );

seminarCoordinatorRouter
  .route("/seminars/evaluation")
  .get(
    AuthorizationMiddleware.authorize([
      constants.SEMINAR_COORDINATOR_GROUP_ACCESS,
    ]),
    SeminarCoordinatorHandler.getSeminarEvaluation
  );

seminarCoordinatorRouter
  .route("/seminars/evaluation/:seminarID")
  .get(
    AuthorizationMiddleware.authorize([
      constants.SEMINAR_COORDINATOR_GROUP_ACCESS,
    ]),
    SeminarCoordinatorHandler.getSeminarEvaluationDetail
  )
  .put(
    AuthorizationMiddleware.authorize([
      constants.SEMINAR_COORDINATOR_GROUP_ACCESS,
    ]),
    SeminarCoordinatorHandler.uploadScoringAndSeminarLetter
  )
  .delete(
    AuthorizationMiddleware.authorize([
      constants.SEMINAR_COORDINATOR_GROUP_ACCESS,
    ]),
    SeminarCoordinatorHandler.deleteSeminarScoringAndEventLetter
  );

seminarCoordinatorRouter
  .route("/seminars/:seminarID")
  .post(
    AuthorizationMiddleware.authorize([
      constants.SEMINAR_COORDINATOR_GROUP_ACCESS,
    ]),
    SeminarCoordinatorHandler.createSeminarSchedule
  )
  .delete(
    AuthorizationMiddleware.authorize([
      constants.SEMINAR_COORDINATOR_GROUP_ACCESS,
    ]),
    SeminarCoordinatorHandler.deleteSeminarSchedule
  )
  .put(
    AuthorizationMiddleware.authorize([
      constants.SEMINAR_COORDINATOR_GROUP_ACCESS,
    ]),
    SeminarCoordinatorHandler.updateSeminarSchedule
  );

export default seminarCoordinatorRouter;
