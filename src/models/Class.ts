import db from "../database";
import { catchPrismaError, constants } from "../utils";
import {
  IPostClass,
  IPutClass,
  IPutUserClass,
} from "../utils/interfaces/Class";

export class Class {
  async insertUserToClass(id: string, payload: string[]) {
    try {
      return await db.class.update({
        where: {
          id,
        },
        data: {
          user: {
            connect: payload.map((i) => {
              return {
                id: i,
              };
            }),
          },
        },
      });
    } catch (error) {
      return catchPrismaError(error);
    }
  }

  async deleteClassById(id: string) {
    try {
      return await db.class.delete({
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
      return await db.class.update({
        where: {
          id,
        },
        data: {
          name: payload.name,
          subjectId: payload.subjectId,
          day: payload.day,
          time: payload.time,
          endTime: payload.endTime,
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

  async getAllClasses(page: number = 1, subjectId: string | undefined) {
    return db.class.findMany({
      include: {
        Subject: true,
        user: true,
      },
      where: {
        subjectId: subjectId === "" ? undefined : subjectId,
      },
      skip: (page - 1) * constants.PAGINATION_OFFSET,
      take: constants.PAGINATION_OFFSET,
    });
  }

  async inserNewClass(id: string, payload: IPostClass) {
    try {
      return await db.class.create({
        data: {
          id,
          name: payload.name,
          subjectId: payload.subjectId,
          day: payload.day,
          time: payload.time,
          endTime: payload.endTime,
        },
      });
    } catch (error) {
      return catchPrismaError(error);
    }
  }
}
