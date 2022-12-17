export interface IUser {
  username: string;
  email?: string;
  name?: string;
  status?: number;
  groupAccess: number;
  description?: string;
  departmentID?: number;
  vocationID?: number;
  labID?: number;
}

// export interface IStudentRequestSignUp {
//   username: string;
//   email: string;
//   name: string;
// }
