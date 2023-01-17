import {
  getBasicAuthorizationHeader,
  getFormattedUrlEndpoint,
} from "./utils.query-function";

const endpoint = `/api/v0/vocations`;

export async function qfGetVocations(departmentID: number) {
  const vocations = await fetch(
    getFormattedUrlEndpoint(`${endpoint}/${departmentID}`),
    {
      method: "GET",
      headers: {
        ...getBasicAuthorizationHeader("", ""),
      },
    }
  );

  return await vocations.json();
}
