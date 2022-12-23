import {
  getAuthorizationHeader,
  getFormattedUrlEndpoint,
} from "./utils.query-function";

const endpoint = `/api/v0/users/`;

interface IPostUser {
  email: "any";
  name: "any";
  username: "any";
  groupAccess: "any";
}
export async function postUsers(body: IPostUser) {
  const users = await fetch(getFormattedUrlEndpoint(`${endpoint}`), {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      ...getAuthorizationHeader(),
    },
  });

  return users;
}

export async function getUserStudents(body: IPostUser) {
  const userStudents = await fetch(
    getFormattedUrlEndpoint(`${endpoint}/students`),
    {
      method: "GET",
      body: JSON.stringify(body),
      headers: {
        ...getAuthorizationHeader(),
      },
    }
  );

  return userStudents;
}

export async function login(authorization: string) {
  const loginResp = await fetch(getFormattedUrlEndpoint(`${endpoint}`), {
    method: "POST",
    headers: {
      ...getAuthorizationHeader(authorization),
    },
  });

  return loginResp;
}

export async function forgetPassword(username: string) {
  const fpResp = await fetch(
    getFormattedUrlEndpoint(`${endpoint}/${username}/forget-password/`),
    {
      method: "GET",
      headers: {
        ...getAuthorizationHeader(),
      },
    }
  );

  return fpResp;
}

interface IUpdatePassword {
  password: "any";
}
export async function updatePassword(
  username: string,
  token: string,
  body: IUpdatePassword
) {
  const fpResp = await fetch(
    getFormattedUrlEndpoint(`${endpoint}/${username}/forget-password/${token}`),
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        ...getAuthorizationHeader(),
      },
    }
  );

  return fpResp;
}
