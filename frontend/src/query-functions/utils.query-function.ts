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
