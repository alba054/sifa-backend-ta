import { API_URL } from "src/utils/const/api";
import { cookieGetLoggedInUserToken } from "src/utils/functions/cookies.function";

export function getFormattedUrlEndpoint(endpoint: string) {
  const urlWithEndpoint = API_URL + endpoint;

  return urlWithEndpoint;
}

export function getBasicAuthorizationHeader(
  username: string,
  password: string
) {
  const key = `${username}:${password}`;
  const encoded = btoa(key);
  return {
    "Content-Type": "application/json",
    // Authorization: `Basic YWRtaW46YWRtaW4=`,
    Authorization: `Basic ${encoded}`,
  };
}

export function getTokenAuthorizationHeader() {
  const token = cookieGetLoggedInUserToken();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export function encodeBase64(value: string) {
  return Buffer.from(value, "base64").toString();
}
