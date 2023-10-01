export interface IUserProfileDTO {
  id: string;
  username: string;
  fullname: string;
  email?: string;
  role: "LECTURER" | "STUDENT" | "ADMIN";
  userId: string;
}
