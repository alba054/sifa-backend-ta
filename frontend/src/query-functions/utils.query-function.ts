import { API_URL } from "src/utils/const/api";

export function getFormattedUrlEndpoint(endpoint: string) {
  const urlWithEndpoint = API_URL + endpoint;

  return urlWithEndpoint;
}

export function getBasicAuthorizationHeader() {
  return {
    "Content-Type": "application/json",
    Authorization: "Basic YWRtaW46YWRtaW4=",
  };
}

export function getTokenAuthorizationHeader() {
  return {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik4wMTExNzEwMDEiLCJlbWFpbCI6IiIsIm5hbWUiOiJBbmlzYWggRmlrcmF0dWwgSW5heWFoIEFud2FyIiwic3RhdHVzIjoxLCJncm91cEFjY2VzcyI6NywiZGVzY3JpcHRpb24iOiIiLCJkZXBhcnRtZW50SUQiOm51bGwsImxhYklEIjpudWxsLCJ2b2NhdGlvbklEIjpudWxsLCJpYXQiOjE2NzI0MTU2OTQsImV4cCI6MTY3NTAwNzY5NCwiaXNzIjoiYXBpLmxvY2FsaG9zdC5jb20ifQ.90kp9Lf3tCtMB-hXy2g3Ol6KYOr47BUzmJM8pg6UiIE",
  };
}
