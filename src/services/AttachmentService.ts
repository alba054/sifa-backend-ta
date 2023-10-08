import { Attachment } from "../models/Attachment";
import { ERRORCODE, createErrorObject } from "../utils";

export class AttachmentService {
  private attachmentModel: Attachment;

  constructor() {
    this.attachmentModel = new Attachment();
  }

  async getAttachmentById(userId: string, id: string) {
    const attachment = await this.attachmentModel.getAttachmentById(id);

    if (!attachment) {
      return createErrorObject(
        404,
        "attachment's not found",
        ERRORCODE.COMMON_NOT_FOUND
      );
    }

    if (!attachment.Reference?.Class?.user.find((u) => u.id === userId)) {
      return createErrorObject(
        400,
        "this attachment's not for you",
        ERRORCODE.BAD_REQUEST_ERROR
      );
    }

    return { attachment: attachment.attachment };
  }
}
