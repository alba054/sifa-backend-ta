import {
  getBasicAuthorizationHeader,
  getFormattedUrlEndpoint,
  getTokenAuthorizationHeader,
} from "./utils.query-function";

const endpoint = `/api/v0/users`;

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
      ...getTokenAuthorizationHeader(),
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
        ...getTokenAuthorizationHeader(),
      },
    }
  );

  return await userStudents.json();
}

export interface IQFLoginParams {
  username: string;
  password: string;
}

export async function qfLogin(params: IQFLoginParams) {
  const loginResp = await fetch(getFormattedUrlEndpoint(`${endpoint}/login`), {
    method: "POST",
    headers: {
      ...getBasicAuthorizationHeader(params.username, params.password),
    },
  });

  const resp = await loginResp.json();

  console.log(resp);

  return resp;
}

export async function qfForgetPassword(username: string) {
  const fpResp = await fetch(
    getFormattedUrlEndpoint(`${endpoint}/${username}/forget-password/`),
    {
      method: "GET",
      headers: {
        // FIXME: This should be password, verify the flow
        ...getBasicAuthorizationHeader(username, "THIS_SHOULD_BE_PASSWORD"),
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
        // FIXME: This should be password, verify the flow
        ...getBasicAuthorizationHeader(username, token),
      },
    }
  );

  return await fpResp.json();
}
