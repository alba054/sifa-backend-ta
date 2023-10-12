import db from "../database";
import { DAY, ROLE, catchPrismaError, constants } from "../utils";
import { IPostUserPayload, IPutUserProfile } from "../utils/interfaces/User";
import bcryptjs from "bcryptjs";

export class User {
  async getUserByClassIncludeTask(classId: string, taskId: string) {
    return db.user.findMany({
      where: {
        role: ROLE.STUDENT,
        classes: {
          some: {
            id: classId,
          },
        },
      },
      include: {
        TaskSubmission: {
          where: {
            taskId,
            turnedInStatus: true,
          },
        },
      },
    });
  }

  async getClassSchedulesByDay(userId: string, day: DAY | any) {
    return db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        classes: {
          where: {
            day,
          },
        },
      },
    });
  }

  async getUserClassesByUserId(userId: string, page: number = 1) {
    return db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        classes: {
          include: {
            user: {
              where: {
                role: ROLE.LECTURER,
              },
            },
          },
        },
      },
    });
  }

  async deleteUserById(id: string) {
    return db.user.delete({
      where: {
        id,
      },
    });
  }

  async getUserById(id: string) {
    return db.user.findUnique({
      where: {
        id,
      },
    });
  }

  async getAllUsers(
    page: number = 1,
    search: string | undefined,
    role: ROLE | any | undefined
  ) {
    return db.user.findMany({
      where: {
        AND: [
          {
            OR: [
              { username: { contains: search === "" ? undefined : search } },
              { email: { contains: search === "" ? undefined : search } },
              { fullname: { contains: search === "" ? undefined : search } },
            ],
          },
          { role: role === "" ? undefined : role },
        ],
      },
      skip: (page - 1) * constants.PAGINATION_OFFSET,
      take: constants.PAGINATION_OFFSET,
    });
  }

  async deleteUserByUsername(username: string) {
    return db.user.delete({
      where: {
        username,
      },
    });
  }

  async inserNewUser(id: string, payload: IPostUserPayload) {
    try {
      return await db.user.create({
        data: {
          id,
          fullname: payload.fullname,
          password: await bcryptjs.hash(
            payload.password,
            constants.PASSWORD_SALT
          ),
          role: payload.role,
          username: payload.username,
          email: payload.email,
        },
      });
    } catch (error) {
      return catchPrismaError(error);
    }
  }

  async updateUserProfileByUsername(
    username: string,
    payload: IPutUserProfile
  ) {
    try {
      return await db.user.update({
        where: {
          username,
        },
        data: {
          email: payload.email,
          fullname: payload.fullname,
          username: payload.username,
          profilePic: payload.pic,
        },
      });
    } catch (error) {
      return catchPrismaError(error);
    }
  }

  async getUserByUsername(username: string) {
    return db.user.findUnique({
      where: {
        username,
      },
    });
  }
}
