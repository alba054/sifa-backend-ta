import db from "../database";
import { ACCEPTANCE_STATUS, ROLE, catchPrismaError, constants } from "../utils";
import { IPutStudentWaitingListAcceptanceStatus } from "../utils/interfaces/StudentWaitingList";
import { IPutClassUser } from "../utils/interfaces/User";

export class StudentWaitingList {
  async deleteStudentWaitingListByUserIdAndClassId(
    userId: string,
    classId: string
  ) {
    return db.studentWaitingList.delete({
      where: {
        userId_classId: {
          userId,
          classId,
        },
      },
    });
  }

  async getStudentWaitingListByUserIdAndClassId(
    userId: string,
    classId: string
  ) {
    return db.studentWaitingList.findUnique({
      where: {
        userId_classId: {
          userId,
          classId,
        },
      },
    });
  }

  async updateAcceptanceStatusById(
    id: string,
    payload: IPutStudentWaitingListAcceptanceStatus
  ) {
    try {
      return await db.studentWaitingList.update({
        where: {
          id,
        },
        data: {
          status: payload
            ? ACCEPTANCE_STATUS.ACCEPTED
            : ACCEPTANCE_STATUS.REJECTED,
        },
      });
    } catch (error) {
      return catchPrismaError(error);
    }
  }

  async getStudentWaitingListById(id: string) {
    return db.studentWaitingList.findUnique({
      where: {
        id,
      },
      include: {
        class: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async getStudentWaitingListByLecturer(
    classId: string,
    userId: string,
    page: number = 1,
    status?: ACCEPTANCE_STATUS | any | undefined
  ) {
    return db.studentWaitingList.findMany({
      where: {
        AND: [
          { classId },
          {
            class: {
              user: {
                some: {
                  id: userId,
                  role: ROLE.LECTURER,
                },
              },
            },
          },
          { status: status === "" ? undefined : status },
        ],
      },
      include: {
        user: true,
      },
      skip: (page - 1) * constants.PAGINATION_OFFSET,
      take: constants.PAGINATION_OFFSET,
    });
  }

  async insertStudentWaitingList(
    id: string,
    userId: string,
    payload: IPutClassUser
  ) {
    try {
      return await db.studentWaitingList.create({
        data: {
          id,
          userId,
          classId: payload.classId,
        },
      });
    } catch (error) {
      return catchPrismaError(error);
    }
  }
}
