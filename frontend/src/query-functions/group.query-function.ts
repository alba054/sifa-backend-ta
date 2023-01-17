import {
  getBasicAuthorizationHeader,
  getFormattedUrlEndpoint,
} from "./utils.query-function";

const endpoint = `/api/v0/groups/`;

export async function qfGetGroups() {
  const groups = await fetch(getFormattedUrlEndpoint(endpoint), {
    method: "GET",
    headers: {
      ...getBasicAuthorizationHeader("", ""),
    },
  });

  return await groups.json();
}
