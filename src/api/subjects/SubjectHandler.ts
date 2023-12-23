import { NextFunction, Request, Response } from "express";
import { Validator } from "../../validator/Validator";
import {
  RESPONSE_MESSAGE,
  constants,
  createResponse,
  throwResultError,
  throwValidationError,
} from "../../utils";
import { SubjectService } from "../../services/SubjectService";
import { IPostSubject, IPutSubject } from "../../utils/interfaces/Subject";
import {
  SubjectEditPayloadSchema,
  SubjectPayloadSchema,
} from "../../validator/SubjectSchema";
import { IListSubjectDTO } from "../../utils/dto/SubjectDTO";
import { BadRequestError } from "../../exceptions/httpError/BadRequestError";
import { NotFoundError } from "../../exceptions/httpError/NotFoundError";
import { InternalServerError } from "../../exceptions/httpError/InternalServerError";

export class SubjectHandler {
  private validator: Validator;
  private subjectService: SubjectService;

  constructor() {
    this.subjectService = new SubjectService();
    this.validator = new Validator();

    this.postSubject = this.postSubject.bind(this);
    this.putSubject = this.putSubject.bind(this);
    this.getSubjects = this.getSubjects.bind(this);
    this.deleteSubject = this.deleteSubject.bind(this);
    this.getSubject = this.getSubject.bind(this);
  }

  async getSubject(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const subject = await this.subjectService.getSubjectById(id);

    try {
      if (subject && "error" in subject) {
        switch (subject.error) {
          case 400:
            throw new BadRequestError(subject.errorCode, subject.message);
          case 404:
            throw new NotFoundError(subject.errorCode, subject.message);
          default:
            throw new InternalServerError(subject.errorCode);
        }
      }

      return res.status(200).json(
        createResponse(RESPONSE_MESSAGE.SUCCESS, {
          name: subject.name,
          code: subject.code,
          id: subject.id,
        } as IListSubjectDTO)
      );
    } catch (error) {
      return next(error);
    }
  }

  async getSubjects(req: Request, res: Response, next: NextFunction) {
    const { page, search } = req.query;

    const subjects = await this.subjectService.getSubjects(
      parseInt(String(page ?? "1")),
      String(search ?? "")
    );

    return res.status(200).json(
      createResponse(
        RESPONSE_MESSAGE.SUCCESS,
        subjects.map((s) => {
          return {
            name: s.name,
            code: s.code,
            id: s.id,
          } as IListSubjectDTO;
        })
      )
    );
  }

  async deleteSubject(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const testError = await this.subjectService.deleteSubjectById(id);
      throwResultError(testError);

      return res
        .status(200)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            "successfully delete subject"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async putSubject(req: Request, res: Response, next: NextFunction) {
    const payload: IPutSubject = req.body;
    const { id } = req.params;

    try {
      const validationResult = this.validator.validate(
        SubjectEditPayloadSchema,
        payload
      );

      throwValidationError(validationResult);
      const testError = await this.subjectService.editSubjectById(id, payload);
      throwResultError(testError);

      return res
        .status(201)
        .json(
          createResponse(RESPONSE_MESSAGE.SUCCESS, "successfully edit subject")
        );
    } catch (error) {
      return next(error);
    }
  }

  async postSubject(req: Request, res: Response, next: NextFunction) {
    const payload: IPostSubject = req.body;

    try {
      const validationResult = this.validator.validate(
        SubjectPayloadSchema,
        payload
      );

      throwValidationError(validationResult);
      const testError = await this.subjectService.addNewSubject(payload);
      throwResultError(testError);

      return res
        .status(201)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            "successfully add new subject"
          )
        );
    } catch (error) {
      return next(error);
    }
  }
}
