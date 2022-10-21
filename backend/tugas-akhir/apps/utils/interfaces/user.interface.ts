export interface IUser {
  username: string;
  email: string;
  name: string;
  status: number;
  groupAccess: number;
  description: string;
}

export interface IStudentRequestSignUp {
  username: string;
  email: string;
  name: string;
}

export interface ISuperUserRequestSignUp {
  username: string;
  email: string;
  name: string;
  groupAccess: number;
  description?: string;
}
