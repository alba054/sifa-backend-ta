import { Attachment } from "../models/Attachment";
import { ERRORCODE, createErrorObject, HISTORYTYPE, ROLE } from "../utils";

export class AttachmentService {
  private attachmentModel: Attachment;

  constructor() {
    this.attachmentModel = new Attachment();
  }

  async getAttachmentById(
    userId: string,
    id: string,
    type: HISTORYTYPE,
    role?: ROLE | undefined
  ) {
    const attachment = await this.attachmentModel.getAttachmentById(id);

    if (!attachment) {
      return createErrorObject(
        404,
        "attachment's not found",
        ERRORCODE.COMMON_NOT_FOUND
      );
    }

    switch (type) {
      case HISTORYTYPE.REFERENCE:
        if (!attachment.Reference?.Class?.user.find((u) => u.id === userId)) {
          return createErrorObject(
            400,
            "this attachment's not for you",
            ERRORCODE.BAD_REQUEST_ERROR
          );
        }
        break;

      case HISTORYTYPE.ANNOUNCEMENT:
        if (
          !attachment.Announcement?.Class?.user.find((u) => u.id === userId)
        ) {
          return createErrorObject(
            400,
            "this attachment's not for you",
            ERRORCODE.BAD_REQUEST_ERROR
          );
        }
        break;

      case HISTORYTYPE.TASK:
        if (!attachment.Task?.Class?.user.find((u) => u.id === userId)) {
          return createErrorObject(
            400,
            "this attachment's not for you",
            ERRORCODE.BAD_REQUEST_ERROR
          );
        }
        break;

      case HISTORYTYPE.TASK_SUBMISSION:
        if (
          !attachment.TaskSubmission?.task?.Class?.user.find(
            (u) => u.id === userId
          )
        ) {
          return createErrorObject(
            400,
            "this attachment's not for you",
            ERRORCODE.BAD_REQUEST_ERROR
          );
        }

        if (role === ROLE.STUDENT) {
          if (attachment.TaskSubmission.studentId !== userId) {
            return createErrorObject(
              400,
              "this attachment's not for you",
              ERRORCODE.BAD_REQUEST_ERROR
            );
          }
        }
        break;
      default:
        break;
    }

    return { attachment: attachment.attachment };
  }
}
