import {
  getAuthorizationHeader,
  getFormattedUrlEndpoint,
} from "./utils.query-function";

const endpoint = `/api/v0/vocations`;

export async function getVocations(departmentID: number) {
  const vocations = await fetch(
    getFormattedUrlEndpoint(`${endpoint}/${departmentID}`),
    {
      method: "GET",
      headers: {
        ...getAuthorizationHeader(),
      },
    }
  );

  return vocations;
}
