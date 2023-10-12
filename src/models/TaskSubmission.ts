import db from "../database";
import { catchPrismaError } from "../utils";
import { IPutTurnInStatusTaskSubmission } from "../utils/interfaces/Task";

export class TaskSubmission {
  async getTaskSubmissionByTaskId(taskId: string) {
    return db.taskSubmission.findFirst({
      where: {
        taskId,
      },
      include: {
        student: true,
        attachments: true,
      },
    });
  }

  async deleteTaskSubmissionById(id: string) {
    try {
      return await db.taskSubmission.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      return catchPrismaError(error);
    }
  }

  async updateTurnedInStatusTaskSubmissionById(
    id: string,
    payload: IPutTurnInStatusTaskSubmission
  ) {
    try {
      return await db.taskSubmission.update({
        where: { id },
        data: {
          turnedInStatus: payload.turnedIn,
        },
      });
    } catch (error) {
      return catchPrismaError(error);
    }
  }

  async getTaskSubmissionById(id: string) {
    return db.taskSubmission.findUnique({
      where: {
        id,
      },
      include: {
        student: true,
        attachments: true,
        task: {
          include: {
            Class: { include: { user: true } },
          },
        },
      },
    });
  }
}
