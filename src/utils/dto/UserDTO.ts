export interface IUserProfileDTO {
  username: string;
  fullname: string;
  email?: string;
  role: "LECTURER" | "STUDENT" | "ADMIN";
  userId: string;
}
