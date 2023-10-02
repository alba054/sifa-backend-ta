import db from "../database";
import { StudentWaitingList } from "../models/StudentWaitingList";
import { User } from "../models/User";
import {
  ACCEPTANCE_STATUS,
  ERRORCODE,
  catchPrismaError,
  createErrorObject,
} from "../utils";
import { IPutStudentWaitingListAcceptanceStatus } from "../utils/interfaces/StudentWaitingList";

export class StudentWaitingListService {
  private studentWaitingListModel: StudentWaitingList;
  private userModel: User;

  constructor() {
    this.studentWaitingListModel = new StudentWaitingList();
    this.userModel = new User();
  }

  async accceptOrRejectStudentWaitingListById(
    userId: string,
    id: string,
    payload: IPutStudentWaitingListAcceptanceStatus
  ) {
    const user = await this.userModel.getUserById(userId);

    if (!user) {
      return createErrorObject(
        404,
        "user's not found",
        ERRORCODE.USER_NOT_FOUND_ERROR
      );
    }

    const waitingList =
      await this.studentWaitingListModel.getStudentWaitingListById(id);

    if (!waitingList) {
      return createErrorObject(
        404,
        "waiting list's not found",
        ERRORCODE.COMMON_NOT_FOUND
      );
    }

    if (!waitingList.class.user.some((u) => u.id === userId)) {
      return createErrorObject(
        400,
        "you are not lecturer in this class",
        ERRORCODE.BAD_REQUEST_ERROR
      );
    }

    if (!payload.status) {
      return this.studentWaitingListModel.updateAcceptanceStatusById(
        id,
        payload
      );
    }

    try {
      return db.$transaction([
        db.studentWaitingList.update({
          where: {
            id,
          },
          data: {
            status: payload
              ? ACCEPTANCE_STATUS.ACCEPTED
              : ACCEPTANCE_STATUS.REJECTED,
          },
        }),
        db.class.update({
          where: {
            id: waitingList.classId,
          },
          data: {
            user: {
              connect: {
                id: waitingList.userId,
              },
            },
          },
        }),
      ]);
    } catch (error) {
      return catchPrismaError(error);
    }
  }

  async getStudentWaitingListOfLecturer(
    classId: string,
    userId: string,
    status?: ACCEPTANCE_STATUS | string | undefined
  ) {
    return this.studentWaitingListModel.getStudentWaitingListByLecturer(
      classId,
      userId,
      status
    );
  }
}
