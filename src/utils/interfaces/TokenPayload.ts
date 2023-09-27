export interface ITokenPayload {
  readonly username: string;
  readonly email?: string;
  readonly role: "LECTURER" | "STUDENT" | "ADMIN";
  readonly userId: string;
}
