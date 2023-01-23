import express from "express";
import { ChatHandler } from "../handlers/chat.handler";
import { AuthorizationMiddleware } from "../middlewares/auth/authorization.middleware";
import { constants } from "../utils/utils";

const chatRouter = express.Router();

// * get all chats (query : media or text)
// * send new message
chatRouter
  .route("/:nim")
  .get(
    AuthorizationMiddleware.authorize([
      constants.STUDENT_GROUP_ACCESS,
      constants.LECTURER_GROUP_ACCESS,
    ]),
    ChatHandler.getAllChatOfThesis
  )
  .post(
    AuthorizationMiddleware.authorize([
      constants.STUDENT_GROUP_ACCESS,
      constants.LECTURER_GROUP_ACCESS,
    ]),
    ChatHandler.createNewMessage
  );

export default chatRouter;
