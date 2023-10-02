import { NextFunction, Request, Response } from "express";
import { Validator } from "../../validator/Validator";
import {
  RESPONSE_MESSAGE,
  ROLE,
  constants,
  createResponse,
  throwResultError,
  throwValidationError,
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

export class ClassHandler {
  private validator: Validator;
  private classService: ClassService;

  constructor() {
    this.validator = new Validator();
    this.classService = new ClassService();

    this.postClass = this.postClass.bind(this);
    this.getClasses = this.getClasses.bind(this);
    this.putClass = this.putClass.bind(this);
    this.deleteClass = this.deleteClass.bind(this);
    this.putLecturerToClass = this.putLecturerToClass.bind(this);
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

    const classes = await this.classService.getClasses(
      parseInt(String(page ?? "1")),
      String(subjectId ?? "")
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
