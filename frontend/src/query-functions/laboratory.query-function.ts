import { cookieGetLoggedInUserNim } from "src/utils/functions/cookies.function";
import {
  getBasicAuthorizationHeader,
  getFormattedUrlEndpoint,
} from "./utils.query-function";

const endpoint = `/api/v0/laboratories/`;

export async function qfGetLaboratories() {
  const laboratories = await fetch(getFormattedUrlEndpoint(endpoint), {
    method: "GET",
    headers: {
      ...getBasicAuthorizationHeader(
        cookieGetLoggedInUserNim()!,
        cookieGetLoggedInUserNim()!
      ),
    },
  });

  return await laboratories.json();
}
