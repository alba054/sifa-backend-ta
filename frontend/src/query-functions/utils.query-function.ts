import { API_URL } from "src/utils/const/api";

export function getFormattedUrlEndpoint(endpoint: string) {
  const urlWithEndpoint = API_URL + endpoint;

  return urlWithEndpoint;
}

export function getBasicAuthorizationHeader() {
  return {
    Authorization: "Basic YWRtaW46YWRtaW4=",
  };
}

export function getTokenAuthorizationHeader() {
  return {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik4wMTExNzEwMDEiLCJlbWFpbCI6IiIsIm5hbWUiOiJBbmlzYWggRmlrcmF0dWwgSW5heWFoIEFud2FyIiwic3RhdHVzIjoxLCJncm91cEFjY2VzcyI6NywiZGVzY3JpcHRpb24iOiIiLCJkZXBhcnRtZW50SUQiOm51bGwsInZvY2F0aW9uSUQiOm51bGwsImlhdCI6MTY3MjA2MTI4NiwiZXhwIjoxNjcyMTQ3Njg2LCJpc3MiOiJhcGkubG9jYWxob3N0LmNvbSJ9.O-GGn4O9oc41iHJZXff8rPzBOPlNXeRqBveXxnFidbM",
  };
}
