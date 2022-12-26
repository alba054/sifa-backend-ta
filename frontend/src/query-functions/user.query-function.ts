import {
  getBasicAuthorizationHeader,
  getFormattedUrlEndpoint,
} from "./utils.query-function";

const endpoint = `/api/v0/users/`;

interface IPostUser {
  email: "any";
  name: "any";
  username: "any";
  groupAccess: "any";
}
export async function qfPostUsers(body: IPostUser) {
  const users = await fetch(getFormattedUrlEndpoint(`${endpoint}`), {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      ...getBasicAuthorizationHeader(),
    },
  });

  return await users.json();
}

export async function qfGetUserStudents(body: IPostUser) {
  const userStudents = await fetch(
    getFormattedUrlEndpoint(`${endpoint}/students`),
    {
      method: "GET",
      body: JSON.stringify(body),
      headers: {
        ...getBasicAuthorizationHeader(),
      },
    }
  );

  return await userStudents.json();
}

export async function qfLogin(authorization: string) {
  const loginResp = await fetch(getFormattedUrlEndpoint(`${endpoint}`), {
    method: "POST",
    headers: {
      ...getBasicAuthorizationHeader(authorization),
    },
  });

  return await loginResp.json();
}

export async function qfForgetPassword(username: string) {
  const fpResp = await fetch(
    getFormattedUrlEndpoint(`${endpoint}/${username}/forget-password/`),
    {
      method: "GET",
      headers: {
        ...getBasicAuthorizationHeader(),
      },
    }
  );

  return await fpResp.json();
}

interface IUpdatePassword {
  password: "any";
}
export async function qfUpdatePassword(
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
        ...getBasicAuthorizationHeader(),
      },
    }
  );

  return await fpResp.json();
}
