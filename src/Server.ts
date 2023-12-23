import express, { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "./middleware/error/ErrorHandler";
import dotenv from "dotenv";
import cors from "cors";
import { UserRouter } from "./api/users/UserRouter";
import { SubjectRouter } from "./api/subjects/SubjectRouter";
import { ClassRouter } from "./api/classes/ClassRouter";
import { StudentWaitingListRouter } from "./api/waiting-lists/StudentWaitingListRouter";
import { ReferenceRouter } from "./api/references/ReferenceRouter";
import { AnnouncementRouter } from "./api/announcements/AnnouncementRouter";
import { TaskRouter } from "./api/tasks/TaskRouter";
import { QuizRouter } from "./api/quizzes/QuizRouter";
import { TestRouter } from "./api/test/TestRouter";

dotenv.config();

class Server {
  app: express.Application;

  constructor() {
    this.app = express();
    this.config();
  }

  config() {
    this.app.disable("x-powered-by");
    this.app.use(function (req: Request, res: Response, next: NextFunction) {
      res.setHeader("Content-Security-Policy", "upgrade-insecure-requests");
      next();
    });

    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(
      "/api/uploaded-file",
      express.static(process.env.STATIC_URL ?? "media")
    );

    // * api base route
    this.app.use("/api", new UserRouter().register());
    this.app.use("/api", new SubjectRouter().register());
    this.app.use("/api", new ClassRouter().register());
    this.app.use("/api", new StudentWaitingListRouter().register());
    this.app.use("/api", new ReferenceRouter().register());
    this.app.use("/api", new AnnouncementRouter().register());
    this.app.use("/api", new TaskRouter().register());
    this.app.use("/api", new QuizRouter().register());
    this.app.use("/api", new TestRouter().register());
    // * error handling
    this.app.use(ErrorHandler);
  }

  start() {
    this.app.listen(
      Number(process.env.PORT) || 5000,
      process.env.HOST || "127.0.0.1",
      () => {
        console.log(
          `server is running on ${process.env.HOST ?? "127.0.0.1"}:${
            process.env.PORT ?? 5000
          }`
        );
      }
    );
  }
}

export const server = new Server();
