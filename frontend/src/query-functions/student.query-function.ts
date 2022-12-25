import { API_URL } from "src/utils/const/api";
import {
  getAuthorizationHeader,
  getFormattedUrlEndpoint,
} from "./utils.query-function";

const endpoint = "/api/v0/students/";

export async function qfGetStudent(nim: string) {
  const student = await fetch(getFormattedUrlEndpoint(`${endpoint}/${nim}`), {
    method: "GET",
    headers: {
      ...getAuthorizationHeader(),
    },
  });

  return await student.json();
}

interface IPutStudent {
  birthDate: "any";
}
export async function qfPutStudent(nim: string, body: IPutStudent) {
  const student = await fetch(getFormattedUrlEndpoint(`${endpoint}/${nim}`), {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      ...getAuthorizationHeader(),
    },
  });

  return await student.json();
}

export async function qfGetStudentReqLabs(nim: string) {
  const studentReqLabs = await fetch(
    getFormattedUrlEndpoint(`${endpoint}/${nim}/reqlabs`),
    {
      method: "GET",
      headers: {
        ...getAuthorizationHeader(),
      },
    }
  );

  return await studentReqLabs.json();
}

interface IPostStudentReqLabs {
  labID: "any";
  studentNIM: "any";
}
export async function qfPostStudentReqLabs(
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

  return await studentReqLabs.json();
}

interface IPutStudentReqLabs {
  labID: "any";
}
export async function qfPutStudentReqLabs(
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

  return await studentReqLabs.json();
}

export async function qfDeleteStudentReqLabs(nim: string, reqlabId: string) {
  const studentReqLabs = await fetch(
    getFormattedUrlEndpoint(`${endpoint}/${nim}/reqlabs/${reqlabId}`),
    {
      method: "DELETE",
      headers: {
        ...getAuthorizationHeader(),
      },
    }
  );

  return await studentReqLabs.json();
}

export async function qfGetStudentThesis(nim: string) {
  const studentThesis = await fetch(
    getFormattedUrlEndpoint(`${endpoint}/${nim}/thesis`),
    {
      method: "GET",
      headers: {
        ...getAuthorizationHeader(),
      },
    }
  );

  return await studentThesis.json();
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
export async function qfPostStudentThesis(
  nim: string,
  body: IPostStudentThesis
) {
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

  return await studentThesis.json();
}

export interface IPutStudentThesis {
  title_1st: "any";
  title_2nd: "any";
}

export async function qfPutStudentThesis(
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

  return await studentThesis.json();
}

export async function qfDeleteStudentThesis(nim: string, thesisID: number) {
  const studentThesis = await fetch(
    getFormattedUrlEndpoint(`${endpoint}/${nim}/thesis/${thesisID}`),
    {
      method: "DELETE",
      headers: {
        ...getAuthorizationHeader(),
      },
    }
  );

  return await studentThesis.json();
}
