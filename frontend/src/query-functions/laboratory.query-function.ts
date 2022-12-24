import {
  getAuthorizationHeader,
  getFormattedUrlEndpoint,
} from "./utils.query-function";

const endpoint = `/api/v0/laboratories/`;

export async function qfGetLaboratories() {
  const laboratories = await fetch(getFormattedUrlEndpoint(endpoint), {
    method: "GET",
    headers: {
      ...getAuthorizationHeader(),
    },
  });

  return await laboratories.json();
}
