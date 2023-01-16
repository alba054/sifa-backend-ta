import express from "express";
import { HeadLabHandler } from "../handlers/headLab.handler";
import { AuthorizationMiddleware } from "../middlewares/auth/authorization.middleware";
import { HeadLabMiddleware } from "../middlewares/headLab.middleware";
import { constants } from "../utils/utils";

const headLabRouter = express.Router();

// * view approved thesis based on its lab
headLabRouter
  .route("/thesis")
  .get(
    AuthorizationMiddleware.authorize([constants.LAB_ADMIN_GROUP_ACCESS]),
    HeadLabHandler.getAllApprovedThesis
  );

// * view thesis detail
headLabRouter
  .route("/thesis/:thesisID")
  .get(
    AuthorizationMiddleware.authorize([constants.LAB_ADMIN_GROUP_ACCESS]),
    HeadLabHandler.getDetailThesis
  );

// * assign lecturer as supervisor
// * get all thesis's supervisors history
headLabRouter
  .route("/thesis/:thesisID/supervisors/")
  .post(
    AuthorizationMiddleware.authorize([constants.LAB_ADMIN_GROUP_ACCESS]),
    HeadLabMiddleware.checkEligibilityToCreate,
    HeadLabHandler.assignSupervisor
  )
  .get(
    AuthorizationMiddleware.authorize([constants.LAB_ADMIN_GROUP_ACCESS]),
    HeadLabHandler.getSupervisorsOfThesis
  );

// * view supervisors history
headLabRouter
  .route("/supervisors")
  .get(
    AuthorizationMiddleware.authorize([constants.LAB_ADMIN_GROUP_ACCESS]),
    HeadLabHandler.viewAssignedSupervisorsHistory
  );

// * edit supervisor
// * get supervisor detail
// * remove supervisor
headLabRouter
  .route("/supervisors/:supervisorID")
  .get(
    AuthorizationMiddleware.authorize([constants.LAB_ADMIN_GROUP_ACCESS]),
    HeadLabHandler.getSupervisorDetail
  )
  .put(
    AuthorizationMiddleware.authorize([constants.LAB_ADMIN_GROUP_ACCESS]),
    HeadLabMiddleware.checkEligibilityToEdit,
    HeadLabHandler.editSupervisor
  )
  .delete(
    AuthorizationMiddleware.authorize([constants.LAB_ADMIN_GROUP_ACCESS]),
    HeadLabHandler.removeSupervisor
  );

// * view thesis dispositions
headLabRouter
  .route("/dispositions")
  .get(
    AuthorizationMiddleware.authorize([constants.LAB_ADMIN_GROUP_ACCESS]),
    HeadLabHandler.getDispositions
  );

// * view disposition detail
headLabRouter
  .route("/dispositions/:thesisID")
  .get(
    AuthorizationMiddleware.authorize([constants.LAB_ADMIN_GROUP_ACCESS]),
    HeadLabHandler.getDispositionDetail
  );

// * get all requests of free lab
// * create new requests of free lab
headLabRouter
  .route("/reqlabs")
  .get(
    AuthorizationMiddleware.authorize([constants.LAB_ADMIN_GROUP_ACCESS]),
    HeadLabHandler.getReqLabsByLabID
  )
  .post(
    AuthorizationMiddleware.authorize([constants.LAB_ADMIN_GROUP_ACCESS]),
    HeadLabHandler.createNewReqLabs
  );

// * request lab detail
// * accept or reject request lab
headLabRouter
  .route("/reqlabs/:reqLabID")
  .get(
    AuthorizationMiddleware.authorize([constants.LAB_ADMIN_GROUP_ACCESS]),
    HeadLabHandler.getRequestLabDetail
  )
  .put(
    AuthorizationMiddleware.authorize([constants.LAB_ADMIN_GROUP_ACCESS]),
    HeadLabHandler.acceptOrRejectRequestLab
  );

// * get lab letters
// * create lab letter
headLabRouter
  .route("/labLetters")
  .get(
    AuthorizationMiddleware.authorize([constants.LAB_ADMIN_GROUP_ACCESS]),
    HeadLabHandler.getLabLetters
  )
  .post(
    AuthorizationMiddleware.authorize([constants.LAB_ADMIN_GROUP_ACCESS]),
    HeadLabHandler.createLabLetter
  );

headLabRouter
  .route("/labLetters/:labLetterID")
  .get(
    AuthorizationMiddleware.authorize([constants.LAB_ADMIN_GROUP_ACCESS]),
    HeadLabHandler.getLabLetterDetail
  )
  .put(
    AuthorizationMiddleware.authorize([constants.LAB_ADMIN_GROUP_ACCESS]),
    HeadLabHandler.editLabLetter
  )
  .delete(
    AuthorizationMiddleware.authorize([constants.LAB_ADMIN_GROUP_ACCESS]),
    HeadLabHandler.deleteLabLetter
  );

export default headLabRouter;
