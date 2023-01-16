import express from "express";
import { RefLetterHandler } from "../handlers/refLetter.handler";
import { AuthenticationMiddleware } from "../middlewares/auth/authentication.middleware";

const refLetterRouter = express.Router();

// * get all reference letters
// * create new reference letter
refLetterRouter
  .route("/")
  .get(
    AuthenticationMiddleware.authenticate("admin"),
    RefLetterHandler.getRefLetter
  )
  .post(
    AuthenticationMiddleware.authenticate("admin"),
    RefLetterHandler.createNewReferenceLetter
  );

export default refLetterRouter;
