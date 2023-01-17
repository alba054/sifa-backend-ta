import {
  getFormattedUrlEndpoint,
  getTokenAuthorizationHeader,
} from "./utils.query-function";
import { cookieGetLoggedInUserNim } from "src/utils/functions/cookies.function";

const endpoint = `/api/v0/lecturers/`;

export async function qfGetLecturers() {
  const lecturers = await fetch(getFormattedUrlEndpoint(endpoint), {
    method: "GET",
    headers: {
      ...getTokenAuthorizationHeader(),
    },
  });

  return await lecturers.json();
}

export async function qfGetLecturer(nim: number) {
  const lecturer = await fetch(getFormattedUrlEndpoint(`${endpoint}/${nim}`), {
    method: "GET",
    headers: {
      ...getTokenAuthorizationHeader(),
    },
  });

  return await lecturer.json();
}

interface IPostLecturer {
  name: "any";
  nip: "any";
  departmentID: "any";
}
export async function qfPostLecturer(lecturerData: IPostLecturer) {
  const newLecturer = await fetch(getFormattedUrlEndpoint(endpoint), {
    method: "POST",
    body: JSON.stringify(lecturerData),
    headers: {
      ...getTokenAuthorizationHeader(),
    },
  });

  return await newLecturer.json();
}

export async function qfGetMentorProposals(acceptanceStatus?: string) {
  const nim = cookieGetLoggedInUserNim();

  const mentorProposals = await fetch(
    getFormattedUrlEndpoint(
      `${endpoint}/${nim}/supervisors?acceptanceStatus=${acceptanceStatus}`
    ),
    {
      method: "GET",
      headers: { ...getTokenAuthorizationHeader() },
    }
  );

  const data = await mentorProposals.json();

  console.log(data);

  return data;
}
