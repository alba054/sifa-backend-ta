import { ROLE } from "..";

export interface IPutUserProfile {
  readonly fullname?: string;
  readonly username?: string;
  readonly email?: string;
  readonly pic?: string;
}

export interface IPostUserPayload {
  readonly fullname: string;
  readonly username: string;
  readonly role: ROLE;
  readonly password: string;
  readonly email?: string;
}

export interface IPutUserMasterData {
  readonly fullname?: string;
  readonly username?: string;
  readonly role?: ROLE;
  readonly password?: string;
  readonly email?: string;
}

export interface IPutClassUser {
  readonly classId: string;
  readonly isCancelled: boolean;
}
