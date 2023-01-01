import {
  getBasicAuthorizationHeader,
  getFormattedUrlEndpoint,
} from "./utils.query-function";

const endpoint = `/api/v0/laboratories/`;

export async function qfGetLaboratories() {
  const laboratories = await fetch(getFormattedUrlEndpoint(endpoint), {
    method: "GET",
    headers: {
      ...getBasicAuthorizationHeader(),
    },
  });

  return await laboratories.json();
}
