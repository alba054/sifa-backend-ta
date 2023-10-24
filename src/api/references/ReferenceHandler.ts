import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../../exceptions/httpError/BadRequestError";
import { ReferenceService } from "../../services/ReferenceService";
import {
  constants,
  createResponse,
  ERRORCODE,
  getTokenPayload,
  HISTORYTYPE,
  RESPONSE_MESSAGE,
  throwResultError,
  throwValidationError,
} from "../../utils";
import { IPostReference } from "../../utils/interfaces/Reference";
import { ITokenPayload } from "../../utils/interfaces/TokenPayload";
import { ReferencePayloadSchema } from "../../validator/references/ReferenceSchema";
import { Validator } from "../../validator/Validator";
import { NotFoundError } from "../../exceptions/httpError/NotFoundError";
import { InternalServerError } from "../../exceptions/httpError/InternalServerError";
import {
  IListReferencesDTO,
  IReferenceDetailDTO,
} from "../../utils/dto/ReferenceDTO";
import { AttachmentService } from "../../services/AttachmentService";

export class ReferenceHandler {
  private validator: Validator;
  private referenceService: ReferenceService;
  private attachmentService: AttachmentService;

  constructor() {
    this.validator = new Validator();
    this.referenceService = new ReferenceService();
    this.attachmentService = new AttachmentService();

    this.postReference = this.postReference.bind(this);
    this.getReferences = this.getReferences.bind(this);
    this.getReferenceDetail = this.getReferenceDetail.bind(this);
    this.getReferenceAttachment = this.getReferenceAttachment.bind(this);
    this.deleteReference = this.deleteReference.bind(this);
  }

  async deleteReference(req: Request, res: Response, next: NextFunction) {
    const tokenPayload: ITokenPayload = getTokenPayload(res);
    const { id } = req.params;

    try {
      const testError = await this.referenceService.deleteReferenceById(
        tokenPayload.userId,
        id
      );
      throwResultError(testError);

      return res
        .status(200)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            "successfully delete reference"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async getReferenceAttachment(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const tokenPayload: ITokenPayload = getTokenPayload(res);
    const { id } = req.params;

    try {
      const attachment = await this.attachmentService.getAttachmentById(
        tokenPayload.userId,
        id,
        HISTORYTYPE.REFERENCE
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

  async getReferenceDetail(req: Request, res: Response, next: NextFunction) {
    const tokenPayload: ITokenPayload = getTokenPayload(res);
    const { id } = req.params;

    try {
      const reference = await this.referenceService.getReferenceById(
        tokenPayload.userId,
        id
      );

      if (reference && "error" in reference) {
        switch (reference.error) {
          case 400:
            throw new BadRequestError(reference.errorCode, reference.message);
          case 404:
            throw new NotFoundError(reference.errorCode, reference.message);
          default:
            throw new InternalServerError(reference.errorCode);
        }
      }

      return res.status(200).json(
        createResponse(RESPONSE_MESSAGE.SUCCESS, {
          attachment: reference.attachments.map(
            (a) => `${constants.ATTACHMENT_REFERENCE_URI}${a.id}`
          ),
          id: reference.id,
          name: reference.name,
          description: reference.description,
          updatedAt: reference.updatedAt,
        } as IReferenceDetailDTO)
      );
    } catch (error) {
      return next(error);
    }
  }

  async getReferences(req: Request, res: Response, next: NextFunction) {
    const tokenPayload: ITokenPayload = getTokenPayload(res);
    const { id } = req.params;

    try {
      const references = await this.referenceService.getReferenceByClassId(
        tokenPayload.userId,
        id
      );

      if (references && "error" in references) {
        switch (references.error) {
          case 400:
            throw new BadRequestError(references.errorCode, references.message);
          case 404:
            throw new NotFoundError(references.errorCode, references.message);
          default:
            throw new InternalServerError(references.errorCode);
        }
      }

      return res.status(200).json(
        createResponse(
          RESPONSE_MESSAGE.SUCCESS,
          references.map((r) => {
            return {
              id: r.id,
              name: r.name,
              updatedAt: r.updatedAt,
            } as IListReferencesDTO;
          })
        )
      );
    } catch (error) {
      return next(error);
    }
  }

  async postReference(req: Request, res: Response, next: NextFunction) {
    const tokenPayload: ITokenPayload = getTokenPayload(res);
    const payload: IPostReference = req.body;

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
        ReferencePayloadSchema,
        payload
      );

      throwValidationError(validationResult);
      const testError = await this.referenceService.addNewReference(
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
            "successfully add new reference to class"
          )
        );
    } catch (error) {
      return next(error);
    }
  }
}
