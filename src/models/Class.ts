import db from "../database";
import { catchPrismaError } from "../utils";
import { IPostClass, IPutClass } from "../utils/interfaces/Class";

export class Class {
  async deleteClassById(id: string) {
    try {
      return db.class.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      return catchPrismaError(error);
    }
  }

  async updateClassById(id: string, payload: IPutClass) {
    try {
      return db.class.update({
        where: {
          id,
        },
        data: {
          name: payload.name,
          subjectId: payload.subjectId,
        },
      });
    } catch (error) {
      return catchPrismaError(error);
    }
  }

  async getClassById(id: string) {
    return db.class.findUnique({
      where: {
        id,
      },
    });
  }

  async getAllClasses(subjectId: string | undefined) {
    return db.class.findMany({
      include: {
        Subject: true,
      },
      where: {
        subjectId: subjectId === "" ? undefined : subjectId,
      },
    });
  }

  async inserNewClass(id: string, payload: IPostClass) {
    try {
      return db.class.create({
        data: {
          id,
          name: payload.name,
          subjectId: payload.subjectId,
        },
      });
    } catch (error) {
      return catchPrismaError(error);
    }
  }
}
