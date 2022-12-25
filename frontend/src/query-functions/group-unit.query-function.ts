import {
  getAuthorizationHeader,
  getFormattedUrlEndpoint,
} from "./utils.query-function";

const endpoint = `/api/v0/group-units/`;

export async function qfGetGroupUnits() {
  const groupUnits = await fetch(getFormattedUrlEndpoint(endpoint), {
    method: "GET",
    headers: {
      ...getAuthorizationHeader(),
    },
  });

  return await groupUnits.json();
}

interface IPostGroupUnit {
  accessName: "any";
  groupID: "any";
}
export async function qfPostGroupUnits(groupUnitParams: IPostGroupUnit) {
  const newGroupUnit = await fetch(getFormattedUrlEndpoint(endpoint), {
    method: "POST",
    body: JSON.stringify(groupUnitParams),
    headers: {
      ...getAuthorizationHeader(),
    },
  });

  return await newGroupUnit.json();
}
