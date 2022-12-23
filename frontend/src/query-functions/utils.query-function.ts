import { API_URL } from "src/utils/const/api";

export function getFormattedUrlEndpoint(endpoint: string) {
  const urlWithEndpoint = API_URL + endpoint;
  const replacedDoubleSlash = urlWithEndpoint.replaceAll("//", "/");

  return replacedDoubleSlash;
}

export function getAuthorizationHeader(authLogin?: string) {
  return {
    Authorization: authLogin ?? "auth",
  };
}
