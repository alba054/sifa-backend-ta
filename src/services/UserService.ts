import { User } from "../models/User";
import { constants, createErrorObject } from "../utils";
import {
  IPostUserPayload,
  IPutUserMasterData,
  IPutUserProfile,
} from "../utils/interfaces/User";
import { v4 as uuidv4 } from "uuid";

export class UserService {
  private userModel: User;

  constructor() {
    this.userModel = new User();
  }

  async getUserById(id: string) {
    const user = await this.userModel.getUserById(id);

    if (!user) {
      return createErrorObject(
        404,
        "user's not found",
        constants.USER_NOT_FOUND_ERROR
      );
    }

    return user;
  }

  async updateUserProfileMaster(id: string, payload: IPutUserMasterData) {
    const user = await this.userModel.getUserById(id);

    if (!user) {
      return createErrorObject();
    }
  }

  async deleteUserById(id: string) {
    const user = await this.userModel.getUserById(id);

    if (!user) {
      return createErrorObject(
        404,
        "user's not found",
        constants.USER_NOT_FOUND_ERROR
      );
    }

    return this.userModel.deleteUserById(id);
  }

  async getAllUsers(
    page: number,
    take: number,
    search?: string | undefined,
    role?: "STUDENT" | "LECTURER" | "ADMIN" | any | undefined
  ) {
    return this.userModel.getAllUsers(page, take, search, role);
  }

  async getUserProfilePicture(username: string) {
    const user = await this.userModel.getUserByUsername(username);

    if (!user?.profilePic) {
      return createErrorObject(
        404,
        "no profile picture's uploaded",
        constants.PROFILE_PICTURE_NOT_FOUND_ERROR
      );
    }

    return user?.profilePic;
  }

  async deleteUserByUsername(username: string) {
    const user = await this.userModel.getUserByUsername(username);

    if (!user) {
      return createErrorObject(
        404,
        "user's not found",
        constants.USER_NOT_FOUND_ERROR
      );
    }

    return this.userModel.deleteUserByUsername(username);
  }

  async addNewUser(payload: IPostUserPayload) {
    return this.userModel.inserNewUser(uuidv4(), payload);
  }

  async updateUserProfile(username: string, payload: IPutUserProfile) {
    return this.userModel.updateUserProfileByUsername(username, payload);
  }

  async getUserByUsername(username: string) {
    const user = await this.userModel.getUserByUsername(username);

    if (!user) {
      return createErrorObject(
        404,
        "user's not found",
        constants.USER_NOT_FOUND_ERROR
      );
    }

    return user;
  }
}
