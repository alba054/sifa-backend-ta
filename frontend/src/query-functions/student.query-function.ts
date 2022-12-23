import { API_URL } from "src/utils/const/api";
import {
  getAuthorizationHeader,
  getFormattedUrlEndpoint,
} from "./utils.query-function";

const endpoint = "/api/v0/students/";

export async function getStudent(nim: string) {
  const student = await fetch(getFormattedUrlEndpoint(`${endpoint}/${nim}`), {
    method: "GET",
    headers: {
      ...getAuthorizationHeader(),
    },
  });

  return student;
}

interface IPutStudent {
  birthDate: "any";
}
export async function putStudent(nim: string, body: IPutStudent) {
  const student = await fetch(getFormattedUrlEndpoint(`${endpoint}/${nim}`), {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      ...getAuthorizationHeader(),
    },
  });

  return student;
}

export async function getStudentReqLabs(nim: string) {
  const studentReqLabs = await fetch(
    getFormattedUrlEndpoint(`${endpoint}/${nim}/reqlabs`),
    {
      method: "GET",
      headers: {
        ...getAuthorizationHeader(),
      },
    }
  );

  return studentReqLabs;
}

interface IPostStudentReqLabs {
  labID: "any";
  studentNIM: "any";
}
export async function postStudentReqLabs(
  nim: string,
  body: IPostStudentReqLabs
) {
  const studentReqLabs = await fetch(
    getFormattedUrlEndpoint(`${endpoint}/${nim}/reqlabs`),
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        ...getAuthorizationHeader(),
      },
    }
  );

  return studentReqLabs;
}

interface IPutStudentReqLabs {
  labID: "any";
}
export async function putStudentReqLabs(
  nim: string,
  reqlabId: string,
  body: IPutStudentReqLabs
) {
  const studentReqLabs = await fetch(
    getFormattedUrlEndpoint(`${endpoint}/${nim}/reqlabs/${reqlabId}`),
    {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        ...getAuthorizationHeader(),
      },
    }
  );

  return studentReqLabs;
}

export async function deleteStudentReqLabs(nim: string, reqlabId: string) {
  const studentReqLabs = await fetch(
    getFormattedUrlEndpoint(`${endpoint}/${nim}/reqlabs/${reqlabId}`),
    {
      method: "DELETE",
      headers: {
        ...getAuthorizationHeader(),
      },
    }
  );

  return studentReqLabs;
}

export async function getStudentThesis(nim: string) {
  const studentThesis = await fetch(
    getFormattedUrlEndpoint(`${endpoint}/${nim}/thesis`),
    {
      method: "GET",
      headers: {
        ...getAuthorizationHeader(),
      },
    }
  );

  return studentThesis;
}

interface IPostStudentThesis {
  title_1st: "any";
  title_2nd: "any";
  labID_1st: "any";
  labID2_1st: "any";
  lecturerPropose_1st: "any";
  labID_2nd: "any";
  labID2_2nd: "any";
  lecturerPropose_2nd: "any";
}
export async function postStudentThesis(nim: string, body: IPostStudentThesis) {
  const studentThesis = await fetch(
    getFormattedUrlEndpoint(`${endpoint}/${nim}/thesis`),
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        ...getAuthorizationHeader(),
      },
    }
  );

  return studentThesis;
}

export interface IPutStudentThesis {
  title_1st: "any";
  title_2nd: "any";
}

export async function putStudentThesis(
  nim: string,
  thesisID: number,
  body: IPutStudentThesis
) {
  const studentThesis = await fetch(
    getFormattedUrlEndpoint(`${endpoint}/${nim}/thesis/${thesisID}`),
    {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        ...getAuthorizationHeader(),
      },
    }
  );

  return studentThesis;
}

export async function deleteStudentThesis(nim: string, thesisID: number) {
  const studentThesis = await fetch(
    getFormattedUrlEndpoint(`${endpoint}/${nim}/thesis/${thesisID}`),
    {
      method: "DELETE",
      headers: {
        ...getAuthorizationHeader(),
      },
    }
  );

  return studentThesis;
}
