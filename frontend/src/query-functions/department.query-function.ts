import {
  getAuthorizationHeader,
  getFormattedUrlEndpoint,
} from "./utils.query-function";

const endpoint = `/api/v0/departments/`;

export async function qfGetDepartments() {
  const departments = await fetch(getFormattedUrlEndpoint(endpoint), {
    method: "GET",
    headers: {
      ...getAuthorizationHeader(),
    },
  });

  return await departments.json();
}
