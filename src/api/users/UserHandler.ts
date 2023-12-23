import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../../exceptions/httpError/BadRequestError";
import { InternalServerError } from "../../exceptions/httpError/InternalServerError";
import { NotFoundError } from "../../exceptions/httpError/NotFoundError";
import { AuthenticationService } from "../../services/facade/AuthenticationService";
import { UserService } from "../../services/UserService";
import {
  ERRORCODE,
  RESPONSE_MESSAGE,
  constants,
  convertEpochToDate,
  createResponse,
  throwResultError,
  throwValidationError,
  getTokenPayload,
  ROLE,
} from "../../utils";
import {
  IUserListUserClassDTO,
  IUserProfileDTO,
} from "../../utils/dto/UserDTO";
import { UploadFileHelper } from "../../utils/helper/UploadFileHelper";
import { ITokenPayload } from "../../utils/interfaces/TokenPayload";
import {
  IPostUserPayload,
  IPutClassUser,
  IPutUserMasterData,
  IPutUserProfile,
} from "../../utils/interfaces/User";
import {
  UserClassPayloadSchema,
  UserPayloadSchema,
  UserProfileMasterPayloadSchema,
  UserProfilePayloadSchema,
} from "../../validator/users/UserSchema";
import { Validator } from "../../validator/Validator";
import { StudentWaitingListService } from "../../services/StudentWaitingListService";
import { IListStudentWaitingListDTO } from "../../utils/dto/StudentWaitingListDTO";
import {
  IClassStudentsDTO,
  IListClassScheduleDTO,
} from "../../utils/dto/ClassDTO";
import { ClassService } from "../../services/ClassService";

export class UserHandler {
  private userService: UserService;
  private validator: Validator;
  private authenticationService: AuthenticationService;
  private studentWaitingListService: StudentWaitingListService;
  private classService: ClassService;

  constructor() {
    this.userService = new UserService();
    this.authenticationService = new AuthenticationService();
    this.studentWaitingListService = new StudentWaitingListService();
    this.classService = new ClassService();
    this.validator = new Validator();

    this.getUserProfile = this.getUserProfile.bind(this);
    this.putUserProfile = this.putUserProfile.bind(this);
    this.postUser = this.postUser.bind(this);
    this.deleteUserAccount = this.deleteUserAccount.bind(this);
    this.postUserLogin = this.postUserLogin.bind(this);
    this.postProfilePicture = this.postProfilePicture.bind(this);
    this.getUserProfilePic = this.getUserProfilePic.bind(this);
    this.deleteUserProfilePic = this.deleteUserProfilePic.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.deleteUserById = this.deleteUserById.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.putRegistrationStudentToClass =
      this.putRegistrationStudentToClass.bind(this);
    this.getLecturerStudentsWaitingLists =
      this.getLecturerStudentsWaitingLists.bind(this);
    this.getUserClasses = this.getUserClasses.bind(this);
    this.getTodayClassSchedules = this.getTodayClassSchedules.bind(this);
    this.getLecturerStudentsClass = this.getLecturerStudentsClass.bind(this);
    this.updateUserById = this.updateUserById.bind(this);
  }

  async getLecturerStudentsClass(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const tokenPayload: ITokenPayload = getTokenPayload(res);
    const { id } = req.params;

    try {
      const students = await this.classService.getStudentsOfClasses(
        tokenPayload.userId,
        id
      );

      if (students && "error" in students) {
        switch (students.error) {
          case 400:
            throw new BadRequestError(students.errorCode, students.message);
          case 404:
            throw new NotFoundError(students.errorCode, students.message);
          default:
            throw new InternalServerError(students.errorCode);
        }
      }

      return res.status(200).json(
        createResponse(RESPONSE_MESSAGE.SUCCESS, {
          classId: students.id,
          className: students.name,
          students: students.user
            .filter((u) => u.role === ROLE.STUDENT)
            .map((s) => {
              return {
                name: s.fullname,
                studentId: s.id,
              };
            }),
        } as IClassStudentsDTO)
      );
    } catch (error) {
      return next(error);
    }
  }

  async getTodayClassSchedules(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const tokenPayload: ITokenPayload = getTokenPayload(res);

    const todaySchedules = await this.userService.getSchedulesByDay(
      tokenPayload.userId,
      convertEpochToDate(new Date().getTime(), constants.OFFSET_TIME)
    );

    return res.status(200).json(
      createResponse(
        RESPONSE_MESSAGE.SUCCESS,
        todaySchedules?.classes.map((c) => {
          return {
            className: c.name,
            id: c.id,
            startTime: c.time,
            endTime: c.endTime,
            day: c.day,
          } as IListClassScheduleDTO;
        })
      )
    );
  }

  async getUserClasses(req: Request, res: Response, next: NextFunction) {
    const tokenPayload: ITokenPayload = getTokenPayload(res);
    const { page } = req.query;

    const userClasses = await this.userService.getUserClasses(
      tokenPayload.userId,
      parseInt(String(page ?? "1"))
    );

    return res.status(200).json(
      createResponse(
        RESPONSE_MESSAGE.SUCCESS,
        userClasses?.classes.map((c) => {
          return {
            className: c.name,
            id: c.id,
            lecturerNames: c.user.map((l) => l.fullname),
          } as IUserListUserClassDTO;
        })
      )
    );
  }

  async getLecturerStudentsWaitingLists(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    const { status, page } = req.query;
    const tokenPayload: ITokenPayload = getTokenPayload(res);

    const result =
      await this.studentWaitingListService.getStudentWaitingListOfLecturer(
        id,
        tokenPayload.userId,
        parseInt(String(page ?? "1")),
        String(status ?? "")
      );

    return res.status(200).json(
      createResponse(
        RESPONSE_MESSAGE.SUCCESS,
        result.map((r) => {
          return {
            fullname: r.user.fullname,
            studentId: r.user.username,
            userId: r.userId,
            status: r.status,
            id: r.id,
          } as IListStudentWaitingListDTO;
        })
      )
    );
  }

  async putRegistrationStudentToClass(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const tokenPayload: ITokenPayload = getTokenPayload(res);
    const payload: IPutClassUser = req.body;

    try {
      const validationResult = this.validator.validate(
        UserClassPayloadSchema,
        payload
      );
      throwValidationError(validationResult);
      const testError = await this.userService.addStudentClassWaitingList(
        tokenPayload.userId,
        payload
      );

      throwResultError(testError);

      return res
        .status(200)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            "successfully join or cancel request"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    
    try {
      
      const user = await this.userService.getUserById(id);
      if (user && "error" in user) {
        switch (user.error) {
          case 400:
            throw new BadRequestError(user.errorCode, user.message);
          case 404:
            throw new NotFoundError(user.errorCode, user.message);
          default:
            throw new InternalServerError(user.errorCode);
        }
      }
  
      return res.status(200).json(
        createResponse(RESPONSE_MESSAGE.SUCCESS, {
          fullname: user.fullname,
          role: user.role,
          userId: user.id,
          username: user.username,
          email: user.email,
        } as IUserProfileDTO)
      );
    } catch (error) {
      return next(error);
    }
  }

  async updateUserById(req: Request, res: Response, next: NextFunction) {
    const payload: IPutUserMasterData = req.body;
    const { id } = req.params;

    try {
      const validationResult = this.validator.validate(
        UserProfileMasterPayloadSchema,
        payload
      );

      throwValidationError(validationResult);

      const testError = await this.userService.updateUserProfileMaster(
        id,
        payload
      );

      throwResultError(testError);

      return res
        .status(200)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            "successfully update user profile"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async deleteUserById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const result = await this.userService.deleteUserById(id);

      throwResultError(result);

      return res
        .status(200)
        .json(createResponse(RESPONSE_MESSAGE.SUCCESS, "deleted user"));
    } catch (error) {
      return next(error);
    }
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    let { page, search, role } = req.query;

    const users = await this.userService.getAllUsers(
      parseInt(String(page ?? "1")),
      String(search ?? ""),
      String(role ?? "")
    );

    return res.status(200).json(
      createResponse(
        RESPONSE_MESSAGE.SUCCESS,
        users.map((u) => {
          return {
            fullname: u.fullname,
            role: u.role,
            userId: u.id,
            username: u.username,
            email: u.email,
          } as IUserProfileDTO;
        })
      )
    );
  }

  async deleteUserProfilePic(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenPayload: ITokenPayload = getTokenPayload(res);

      await this.userService.updateUserProfile(tokenPayload.username, {
        pic: "",
      });

      return res
        .status(200)
        .json(
          createResponse(RESPONSE_MESSAGE.SUCCESS, "deleted user profile pic")
        );
    } catch (error) {
      return next(error);
    }
  }

  async getUserProfilePic(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenPayload: ITokenPayload = getTokenPayload(res);
      const fileToSend = await this.userService.getUserProfilePicture(
        tokenPayload.username
      );

      if (typeof fileToSend === "string") {
        return res.sendFile(`${constants.ABS_PATH}/${fileToSend}`);
      }
      switch (fileToSend?.error) {
        case 400:
          throw new BadRequestError(fileToSend.errorCode, fileToSend.message);
        case 404:
          throw new NotFoundError(fileToSend.errorCode, fileToSend.message);
        default:
          throw new InternalServerError(fileToSend.errorCode);
      }
    } catch (error) {
      return next(error);
    }
  }

  async postProfilePicture(req: Request, res: Response, next: NextFunction) {
    const tokenPayload: ITokenPayload = getTokenPayload(res);

    try {
      if (!req.file?.buffer) {
        throw new BadRequestError(
          ERRORCODE.VALIDATOR_ERROR,
          "upload file with fieldname pic"
        );
      }

      const savedFile = UploadFileHelper.uploadFileBuffer(
        req.file.originalname,
        constants.PROFILE_PIC_PATH,
        req.file.buffer
      );

      await this.userService.updateUserProfile(tokenPayload.username, {
        pic: savedFile,
      });

      return res
        .status(201)
        .json(createResponse(RESPONSE_MESSAGE.SUCCESS, savedFile));
    } catch (error) {
      return next(error);
    }
  }

  async postUserLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await this.authenticationService.generateToken(
        getTokenPayload(res)
      );

      return res
        .status(200)
        .json(createResponse(RESPONSE_MESSAGE.SUCCESS, token));
    } catch (error) {
      return next(error);
    }
  }

  async deleteUserAccount(req: Request, res: Response, next: NextFunction) {
    const tokenPayload: ITokenPayload = getTokenPayload(res);

    try {
      const result = await this.userService.deleteUserByUsername(
        tokenPayload.username
      );

      throwResultError(result);

      return res
        .status(200)
        .json(createResponse(RESPONSE_MESSAGE.SUCCESS, "deleted user"));
    } catch (error) {
      return next(error);
    }
  }

  async postUser(req: Request, res: Response, next: NextFunction) {
    const payload: IPostUserPayload = req.body;

    try {
      const validationResult = this.validator.validate(
        UserPayloadSchema,
        payload
      );
      throwValidationError(validationResult);
      const testError = await this.userService.addNewUser(payload);
      throwResultError(testError);

      return res
        .status(201)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            "successfully register a new user"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async putUserProfile(req: Request, res: Response, next: NextFunction) {
    const tokenPayload: ITokenPayload = getTokenPayload(res);
    const payload: IPutUserProfile = req.body;

    try {
      const validationResult = this.validator.validate(
        UserProfilePayloadSchema,
        payload
      );

      throwValidationError(validationResult);

      const testError = await this.userService.updateUserProfile(
        tokenPayload.username,
        payload
      );
      throwResultError(testError);

      return res
        .status(200)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            "successfully update user profile"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async getUserProfile(req: Request, res: Response, next: NextFunction) {
    const tokenPayload: ITokenPayload = getTokenPayload(res);
    const user = await this.userService.getUserByUsername(
      tokenPayload.username
    );

    if (user && "error" in user) {
      switch (user.error) {
        case 404:
          throw new NotFoundError(user.errorCode, user.message);
        default:
          throw new InternalServerError(user.errorCode);
      }
    }

    return res.status(200).json(
      createResponse(RESPONSE_MESSAGE.SUCCESS, {
        fullname: user.fullname,
        role: user.role,
        userId: user.id,
        username: user.username,
        email: user.email,
      } as IUserProfileDTO)
    );
  }
}
