import {
  getAuthorizationHeader,
  getFormattedUrlEndpoint,
} from "./utils.query-function";

const endpoint = `/api/v0/lecturers/`;

export async function getLecturers() {
  const lecturers = await fetch(getFormattedUrlEndpoint(endpoint), {
    method: "GET",
    headers: {
      ...getAuthorizationHeader(),
    },
  });

  return await lecturers.json();
}

export async function getLecturer(nim: number) {
  const lecturer = await fetch(getFormattedUrlEndpoint(`${endpoint}/${nim}`), {
    method: "GET",
    headers: {
      ...getAuthorizationHeader(),
    },
  });

  return await lecturer.json();
}

interface IPostLecturer {
  name: "any";
  nip: "any";
  departmentID: "any";
}
export async function postLecturer(lecturerData: IPostLecturer) {
  const newLecturer = await fetch(getFormattedUrlEndpoint(endpoint), {
    method: "POST",
    body: JSON.stringify(lecturerData),
    headers: {
      ...getAuthorizationHeader(),
    },
  });

  return await newLecturer.json();
}
