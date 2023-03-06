export interface IUser {
  id?: number;
  username: string;
  email?: string;
  name?: string;
  status?: number;
  groupAccess: number;
  description?: string;
  departmentID?: number;
  vocationID?: number;
  labID?: number;
  password?: string;
  signature?: string;
}

// export interface IStudentRequestSignUp {
//   username: string;
//   email: string;
//   name: string;
// }
