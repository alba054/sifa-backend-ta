import express from "express";
import { LecturerHandler } from "../handlers/lecturer.handler";
import { AuthenticationMiddleware } from "../middlewares/auth/authentication.middleware";
import { AuthorizationMiddleware } from "../middlewares/auth/authorization.middleware";
import { constants } from "../utils/utils";

const lecturerRouter = express.Router();

// * post new lecturer
lecturerRouter.post(
  "/",
  AuthorizationMiddleware.authorize([constants.SUPERUSER_GROUP_ACCESS]),
  LecturerHandler.insertNewLecturer
);

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
