import { IPostSubject, IPutSubject } from "../utils/interfaces/Subject";
import { catchPrismaError, constants, createErrorObject } from "../utils";
import db from "../database";

export class Subject {
  async getAllSubjects() {
    return db.subject.findMany();
  }

  async deleteSubjectById(id: string) {
    try {
      return db.subject.delete({
        where: { id },
      });
    } catch (error) {
      return catchPrismaError(error);
    }
  }

  async updateSubjectById(id: string, payload: IPutSubject) {
    try {
      return db.subject.update({
        where: {
          id,
        },
        data: {
          code: payload.code,
          name: payload.name,
        },
      });
    } catch (error) {
      return catchPrismaError(error);
    }
  }

  async getSubjectById(id: string) {
    return db.subject.findUnique({
      where: {
        id,
      },
    });
  }

  async inserNewSubject(id: string, payload: IPostSubject) {
    try {
      return db.subject.create({
        data: {
          id,
          name: payload.name,
          code: payload.code,
        },
      });
    } catch (error) {
      return catchPrismaError(error);
    }
  }
}
