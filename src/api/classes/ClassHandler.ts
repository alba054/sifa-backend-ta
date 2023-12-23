import { NextFunction, Request, Response } from "express";
import { Validator } from "../../validator/Validator";
import {
  RESPONSE_MESSAGE,
  ROLE,
  createResponse,
  throwResultError,
  throwValidationError,
  getTokenPayload,
} from "../../utils";
import { ClassService } from "../../services/ClassService";
import {
  IPostClass,
  IPutClass,
  IPutUserClass,
} from "../../utils/interfaces/Class";
import {
  ClassEditPayloadSchema,
  ClassLecturerPayloadSchema,
  ClassPayloadSchema,
} from "../../validator/classes/ClassSchema";
import { IListClassDTO } from "../../utils/dto/ClassDTO";
import { BadRequestError } from "../../exceptions/httpError/BadRequestError";
import { NotFoundError } from "../../exceptions/httpError/NotFoundError";
import { InternalServerError } from "../../exceptions/httpError/InternalServerError";
import { ITokenPayload } from "../../utils/interfaces/TokenPayload";
import { HistoryService } from "../../services/HistoryService";
import { IHistoryDTO } from "../../utils/dto/HistoryDTO";

export class ClassHandler {
  private validator: Validator;
  private classService: ClassService;
  private historyService: HistoryService;

  constructor() {
    this.validator = new Validator();
    this.classService = new ClassService();
    this.historyService = new HistoryService();

    this.postClass = this.postClass.bind(this);
    this.getClasses = this.getClasses.bind(this);
    this.putClass = this.putClass.bind(this);
    this.deleteClass = this.deleteClass.bind(this);
    this.putLecturerToClass = this.putLecturerToClass.bind(this);
    this.getClass = this.getClass.bind(this);
    this.getClassHistories = this.getClassHistories.bind(this);
  }

  async getClassHistories(req: Request, res: Response, next: NextFunction) {
    const tokenPayload: ITokenPayload = getTokenPayload(res);
    const { id } = req.params;

    try {
      const histories = await this.historyService.getHistoryByClassId(
        tokenPayload.userId,
        id
      );

      if (histories && "error" in histories) {
        switch (histories.error) {
          case 400:
            throw new BadRequestError(histories.errorCode, histories.message);
          case 404:
            throw new NotFoundError(histories.errorCode, histories.message);
          default:
            throw new InternalServerError(histories.errorCode);
        }
      }

      return res.status(200).json(
        createResponse(
          RESPONSE_MESSAGE.SUCCESS,
          histories.map((h) => {
            return {
              createdAt: h.createdAt,
              updatedAt: h.updatedAt,
              id: h.id,
              type: h.historyType,
              uri: h.uri,
              description: h.description,
              lecturerName: h.lecturer?.fullname,
            } as IHistoryDTO;
          })
        )
      );
    } catch (error) {
      return next(error);
    }
  }

  async getClass(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const class_ = await this.classService.getClassById(id);

    try {
      if (class_ && "error" in class_) {
        switch (class_.error) {
          case 400:
            throw new BadRequestError(class_.errorCode, class_.message);
          case 404:
            throw new NotFoundError(class_.errorCode, class_.message);
          default:
            throw new InternalServerError(class_.errorCode);
        }
      }

      return res.status(200).json(
        createResponse(RESPONSE_MESSAGE.SUCCESS, {
          id: class_.id,
          name: class_.name,
          subject: {
            id: class_.Subject.id,
            code: class_.Subject.code,
            name: class_.Subject.name,
          },
          day: class_.day,
          time: class_.time,
          endTime: class_.endTime,
          lecturers: class_.user
            .filter((u) => u.role === ROLE.LECTURER)
            .map((u) => {
              return {
                id: u.id,
                fullname: u.fullname,
                username: u.username,
              };
            }),
          students: class_.user
            .filter((u) => u.role === ROLE.STUDENT)
            .map((u) => {
              return {
                id: u.id,
                fullname: u.fullname,
                username: u.username,
              };
            }),
        } as IListClassDTO)
      );
    } catch (error) {
      return next(error);
    }
  }

  async putLecturerToClass(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const payload: IPutUserClass = req.body;

    try {
      const validationResult = this.validator.validate(
        ClassLecturerPayloadSchema,
        payload
      );

      throwValidationError(validationResult);
      const testError = await this.classService.assignLectureToClassById(
        id,
        payload
      );
      throwResultError(testError);

      return res
        .status(200)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            "successfully assign lecture to class"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async deleteClass(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const testError = await this.classService.deleteClassById(id);
      throwResultError(testError);

      return res
        .status(200)
        .json(
          createResponse(RESPONSE_MESSAGE.SUCCESS, "successfully delete class")
        );
    } catch (error) {
      return next(error);
    }
  }

  async putClass(req: Request, res: Response, next: NextFunction) {
    const payload: IPutClass = req.body;
    const { id } = req.params;

    try {
      const validationResult = this.validator.validate(
        ClassEditPayloadSchema,
        payload
      );

      throwValidationError(validationResult);
      const testError = await this.classService.editClassById(id, payload);
      throwResultError(testError);

      return res
        .status(200)
        .json(
          createResponse(RESPONSE_MESSAGE.SUCCESS, "successfully edit class")
        );
    } catch (error) {
      return next(error);
    }
  }

  async getClasses(req: Request, res: Response, next: NextFunction) {
    const { subjectId, page } = req.query;
    const tokenPayload: ITokenPayload = getTokenPayload(res);

    const classes = await this.classService.getClasses(
      parseInt(String(page ?? "1")),
      String(subjectId ?? ""),
      tokenPayload.userId
    );

    return res.status(200).json(
      createResponse(
        RESPONSE_MESSAGE.SUCCESS,
        classes.map((c) => {
          return {
            id: c.id,
            name: c.name,
            subject: {
              id: c.Subject.id,
              code: c.Subject.code,
              name: c.Subject.name,
            },
            day: c.day,
            time: c.time,
            endTime: c.endTime,
            lecturers: c.user
              .filter((u) => u.role === ROLE.LECTURER)
              .map((u) => {
                return {
                  id: u.id,
                  fullname: u.fullname,
                  username: u.username,
                };
              }),
            students: c.user
              .filter((u) => u.role === ROLE.STUDENT)
              .map((u) => {
                return {
                  id: u.id,
                  fullname: u.fullname,
                  username: u.username,
                };
              }),
          } as IListClassDTO;
        })
      )
    );
  }

  async postClass(req: Request, res: Response, next: NextFunction) {
    const payload: IPostClass = req.body;

    try {
      const validationResult = this.validator.validate(
        ClassPayloadSchema,
        payload
      );

      throwValidationError(validationResult);
      const testError = await this.classService.addNewClass(payload);
      throwResultError(testError);

      return res
        .status(201)
        .json(
          createResponse(RESPONSE_MESSAGE.SUCCESS, "successfully add new class")
        );
    } catch (error) {
      return next(error);
    }
  }
}
