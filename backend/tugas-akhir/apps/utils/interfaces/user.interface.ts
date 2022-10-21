export interface IUser {
  username: string;
  email: string;
  name: string;
  status: number;
  groupAccess: number;
  description: string;
}

export interface IUserRequestBody {
  username: string;
  email: string;
  name?: string;
  description?: string;
  groupAccess?: number | undefined;
}
