import {
  getAuthorizationHeader,
  getFormattedUrlEndpoint,
} from "./utils.query-function";

const endpoint = `/api/v0/groups/`;

export async function qfGetGroups() {
  const groups = await fetch(getFormattedUrlEndpoint(endpoint), {
    method: "GET",
    headers: {
      ...getAuthorizationHeader(),
    },
  });

  return await groups.json();
}
