import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../../exceptions/httpError/BadRequestError";
import { InternalServerError } from "../../exceptions/httpError/InternalServerError";
import { NotFoundError } from "../../exceptions/httpError/NotFoundError";
import { AnnouncementService } from "../../services/AnnouncementService";
import { AttachmentService } from "../../services/AttachmentService";
import {
  constants,
  createResponse,
  ERRORCODE,
  HISTORYTYPE,
  RESPONSE_MESSAGE,
  throwResultError,
  throwValidationError,
} from "../../utils";
import {
  IAnnouncementDetailDTO,
  IListAnnouncementsDTO,
} from "../../utils/dto/AnnouncementDTO";
import { IPostAnnouncement } from "../../utils/interfaces/Announcement";
import { ITokenPayload } from "../../utils/interfaces/TokenPayload";
import { AnnouncementPayloadSchema } from "../../validator/announcements/AnnouncementSchema";
import { Validator } from "../../validator/Validator";

export class AnnouncementHandler {
  private validator: Validator;
  private annoucementService: AnnouncementService;
  private attachmentService: AttachmentService;

  constructor() {
    this.annoucementService = new AnnouncementService();
    this.attachmentService = new AttachmentService();
    this.validator = new Validator();

    this.getAnnouncementDetail = this.getAnnouncementDetail.bind(this);
    this.postAnnouncements = this.postAnnouncements.bind(this);
    this.deleteAnnouncement = this.deleteAnnouncement.bind(this);
    this.getAnnouncements = this.getAnnouncements.bind(this);
    this.getAnnouncementAttachment = this.getAnnouncementAttachment.bind(this);
  }

  async getAnnouncementAttachment(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const tokenPayload: ITokenPayload = res.locals.user;
    const { id } = req.params;

    try {
      const attachment = await this.attachmentService.getAttachmentById(
        tokenPayload.userId,
        id,
        HISTORYTYPE.ANNOUNCEMENT
      );

      if (attachment && "error" in attachment) {
        switch (attachment.error) {
          case 400:
            throw new BadRequestError(attachment.errorCode, attachment.message);
          case 404:
            throw new NotFoundError(attachment.errorCode, attachment.message);
          default:
            throw new InternalServerError(attachment.errorCode);
        }
      }

      return res.sendFile(`${constants.ABS_PATH}/${attachment.attachment}`);
    } catch (error) {
      return next(error);
    }
  }

  async getAnnouncements(req: Request, res: Response, next: NextFunction) {
    const tokenPayload: ITokenPayload = res.locals.user;
    const { id } = req.params;

    try {
      const announcements =
        await this.annoucementService.getAnnouncementByClassId(
          tokenPayload.userId,
          id
        );

      if (announcements && "error" in announcements) {
        switch (announcements.error) {
          case 400:
            throw new BadRequestError(
              announcements.errorCode,
              announcements.message
            );
          case 404:
            throw new NotFoundError(
              announcements.errorCode,
              announcements.message
            );
          default:
            throw new InternalServerError(announcements.errorCode);
        }
      }

      return res.status(200).json(
        createResponse(
          RESPONSE_MESSAGE.SUCCESS,
          announcements.map((r) => {
            return {
              id: r.id,
              name: r.name,
              updatedAt: r.updatedAt,
              authorName: r.author?.fullname,
            } as IListAnnouncementsDTO;
          })
        )
      );
    } catch (error) {
      return next(error);
    }
  }

  async deleteAnnouncement(req: Request, res: Response, next: NextFunction) {
    const tokenPayload: ITokenPayload = res.locals.user;
    const { id } = req.params;

    try {
      const testError = await this.annoucementService.deleteAnnouncementById(
        tokenPayload.userId,
        id
      );
      throwResultError(testError);

      return res
        .status(200)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            "successfully delete announcement"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async getAnnouncementDetail(req: Request, res: Response, next: NextFunction) {
    const tokenPayload: ITokenPayload = res.locals.user;
    const { id } = req.params;

    try {
      const announcement = await this.annoucementService.getAnnouncementById(
        tokenPayload.userId,
        id
      );

      if (announcement && "error" in announcement) {
        switch (announcement.error) {
          case 400:
            throw new BadRequestError(
              announcement.errorCode,
              announcement.message
            );
          case 404:
            throw new NotFoundError(
              announcement.errorCode,
              announcement.message
            );
          default:
            throw new InternalServerError(announcement.errorCode);
        }
      }

      return res.status(200).json(
        createResponse(RESPONSE_MESSAGE.SUCCESS, {
          attachment: announcement.attachments.map(
            (a) => `${constants.ANNOUNCEMENT_REFERENCE_URI}${a.id}`
          ),
          id: announcement.id,
          name: announcement.name,
          description: announcement.description,
          updatedAt: announcement.updatedAt,
          authorName: announcement.author?.fullname,
        } as IAnnouncementDetailDTO)
      );
    } catch (error) {
      return next(error);
    }
  }

  async postAnnouncements(req: Request, res: Response, next: NextFunction) {
    const tokenPayload: ITokenPayload = res.locals.user;
    const payload: IPostAnnouncement = req.body;

    try {
      if (!req.files) {
        throw new BadRequestError(ERRORCODE.BAD_REQUEST_ERROR, "provide files");
      }

      if (!req.files.length) {
        throw new BadRequestError(
          ERRORCODE.BAD_REQUEST_ERROR,
          "at least one file in files"
        );
      }

      const validationResult = this.validator.validate(
        AnnouncementPayloadSchema,
        payload
      );

      throwValidationError(validationResult);
      const testError = await this.annoucementService.addNewAnnouncement(
        tokenPayload.userId,
        payload,
        req.files
      );
      throwResultError(testError);

      return res
        .status(201)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            "successfully add new announcement to class"
          )
        );
    } catch (error) {
      return next(error);
    }
  }
}
