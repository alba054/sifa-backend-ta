import { ROLE } from "..";

export interface ITokenPayload {
  readonly username: string;
  readonly email?: string;
  readonly role: ROLE;
  readonly userId: string;
}
