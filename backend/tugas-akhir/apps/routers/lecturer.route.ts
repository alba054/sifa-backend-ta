import express from "express";
import { LecturerHandler } from "../handlers/lecturer.handler";
import { AuthenticationMiddleware } from "../middlewares/auth/authentication.middleware";
import { AuthorizationMiddleware } from "../middlewares/auth/authorization.middleware";
import { constants } from "../utils/utils";

const lecturerRouter = express.Router();

// * post new lecturer
// !deprecated
// lecturerRouter.post(
//   "/",
//   AuthorizationMiddleware.authorize([constants.SUPERUSER_GROUP_ACCESS]),
//   LecturerHandler.insertNewLecturer
// );

// * use {departmentID} as query param to get spesific lecturer based on departmentID
lecturerRouter.get(
  "/",
  AuthenticationMiddleware.authenticate("admin"),
  // AuthorizationMiddleware.authorize([constants.SUPERUSER_GROUP_ACCESS]),
  LecturerHandler.getAllLecturers
);

// * get lecturer's profile
lecturerRouter.get(
  "/:nim",
  AuthorizationMiddleware.authorize([
    constants.SUPERUSER_GROUP_ACCESS,
    constants.LECTURER_GROUP_ACCESS,
  ]),
  LecturerHandler.getLecturersProfile
);

lecturerRouter
  .route("/:nim/thesis/supervisors")
  .get(
    AuthorizationMiddleware.authorize([constants.LECTURER_GROUP_ACCESS]),
    LecturerHandler.getAllApprentices
  );

lecturerRouter
  .route("/:nim/thesis")
  .get(
    AuthorizationMiddleware.authorize([constants.LECTURER_GROUP_ACCESS]),
    LecturerHandler.getUnconfirmedProposedThesis
  );

lecturerRouter
  .route("/:nim/thesis/:thesisID")
  .get(
    AuthorizationMiddleware.authorize([constants.LECTURER_GROUP_ACCESS]),
    LecturerHandler.getUnconfirmedProposedThesisDetail
  )
  .put(
    AuthorizationMiddleware.authorize([constants.LECTURER_GROUP_ACCESS]),
    LecturerHandler.confirmProposedThesis
  );

// * view all offer becoming supervisor/co-supervisor
lecturerRouter
  .route("/:nim/supervisors")
  .get(
    AuthorizationMiddleware.authorize([constants.LECTURER_GROUP_ACCESS]),
    LecturerHandler.getOffersBecomingSupervisor
  );

// * get offer detail
// * delete offer
// * accept/reject offer
lecturerRouter
  .route("/:nim/supervisors/:supervisorID")
  .get(
    AuthorizationMiddleware.authorize([constants.LECTURER_GROUP_ACCESS]),
    LecturerHandler.getOfferDetail
  )
  .delete(
    AuthorizationMiddleware.authorize([constants.LECTURER_GROUP_ACCESS]),
    LecturerHandler.deleteSupervisor
  )
  .put(
    AuthorizationMiddleware.authorize([constants.LECTURER_GROUP_ACCESS]),
    LecturerHandler.accceptOrRejectOffer
  );

// * view all offer becoming examiner
lecturerRouter
  .route("/:nim/examiners")
  .get(
    AuthorizationMiddleware.authorize([constants.LECTURER_GROUP_ACCESS]),
    LecturerHandler.getOffersBecomingExaminers
  );

// * get examiner offer detail
// * delete examiner offer
// * accept/reject examiner offer
lecturerRouter
  .route("/:nim/examiners/:examinerID")
  .get(
    AuthorizationMiddleware.authorize([constants.LECTURER_GROUP_ACCESS]),
    LecturerHandler.getExaminerOfferDetail
  )
  .delete(
    AuthorizationMiddleware.authorize([constants.LECTURER_GROUP_ACCESS]),
    LecturerHandler.deleteExaminer
  )
  .put(
    AuthorizationMiddleware.authorize([constants.LECTURER_GROUP_ACCESS]),
    LecturerHandler.accceptOrRejectExaminerOffer
  );

lecturerRouter
  .route("/:nim/seminars")
  .get(
    AuthorizationMiddleware.authorize([constants.LECTURER_GROUP_ACCESS]),
    LecturerHandler.getSeminarRequests
  );

lecturerRouter
  .route("/:nim/seminars/scheduled")
  .get(
    AuthorizationMiddleware.authorize([constants.LECTURER_GROUP_ACCESS]),
    LecturerHandler.getScheduledSeminars
  );

lecturerRouter
  .route("/:nim/seminars/scheduled/:seminarID")
  .get(
    AuthorizationMiddleware.authorize([constants.LECTURER_GROUP_ACCESS]),
    LecturerHandler.getScheduledSeminarDetail
  )
  .put(
    AuthorizationMiddleware.authorize([constants.LECTURER_GROUP_ACCESS]),
    LecturerHandler.acceptOrRejectScheduledSeminar
  );

lecturerRouter
  .route("/:nim/seminars/invited")
  .get(
    AuthorizationMiddleware.authorize([constants.LECTURER_GROUP_ACCESS]),
    LecturerHandler.getInvitedSeminars
  );

lecturerRouter
  .route("/:nim/seminars/invited/:seminarID")
  .get(
    AuthorizationMiddleware.authorize([constants.LECTURER_GROUP_ACCESS]),
    LecturerHandler.getInvitedSeminarDetail
  );

lecturerRouter
  .route("/:nim/seminars/invited/:seminarID/scoring")
  .post(
    AuthorizationMiddleware.authorize([constants.LECTURER_GROUP_ACCESS]),
    LecturerHandler.scoreInvitedSeminarV2
  );

lecturerRouter
  .route("/:nim/seminars/invited/:seminarID/noting")
  .post(
    AuthorizationMiddleware.authorize([constants.LECTURER_GROUP_ACCESS]),
    LecturerHandler.noteInvitedSeminar
  );

lecturerRouter
  .route("/:nim/thesis/:thesisID/seminars")
  .get(
    AuthorizationMiddleware.authorize([constants.LECTURER_GROUP_ACCESS]),
    LecturerHandler.getSeminarsOfThesis
  );

lecturerRouter
  .route("/:nim/seminars/:seminarID")
  .get(
    AuthorizationMiddleware.authorize([constants.LECTURER_GROUP_ACCESS]),
    LecturerHandler.getSeminarRequestsDetail
  )
  .put(
    AuthorizationMiddleware.authorize([constants.LECTURER_GROUP_ACCESS]),
    LecturerHandler.acceptOrRejectSeminarRequest
  );

lecturerRouter
  .route("/:nim/moderator/seminars")
  .get(
    AuthorizationMiddleware.authorize([constants.LECTURER_GROUP_ACCESS]),
    LecturerHandler.getSeminarsAsModerator
  );

lecturerRouter
  .route("/:nim/moderator/seminars/:seminarID")
  .put(
    AuthorizationMiddleware.authorize([constants.LECTURER_GROUP_ACCESS]),
    LecturerHandler.acceptOrRejectSeminarAsModerator
  );

lecturerRouter
  .route("/:nim/moderator/seminars/evaluation")
  .get(
    AuthorizationMiddleware.authorize([
      constants.SEMINAR_COORDINATOR_GROUP_ACCESS,
      constants.LECTURER_GROUP_ACCESS,
    ]),
    LecturerHandler.getSeminarEvaluation
  );

lecturerRouter
  .route("/:nim/moderator/seminars/:seminarID/scoring")
  .put(
    AuthorizationMiddleware.authorize([constants.LECTURER_GROUP_ACCESS]),
    LecturerHandler.scoreSeminar
  );

// lecturerRouter.route("/:nim/")
// // * restore status to InProcess
// lecturerRouter
//   .route("/:nim/supervisors/:supervisorID/restore")
//   .put(
//     AuthorizationMiddleware.authorize([constants.LECTURER_GROUP_ACCESS]),
//     LecturerHandler.restoreStatus
//   );

// lecturerRouter
//   .route("/:nim")
//   .get(
//     AuthorizationMiddleware.authorize([constants.LECTURER_GROUP_ACCESS]),
//     LecturerHandler.getLecturerProfile
//   )
//   .put(
//     AuthorizationMiddleware.authorize([constants.LECTURER_GROUP_ACCESS]),
//     LecturerHandler.updateProfile
//   );

export default lecturerRouter;
