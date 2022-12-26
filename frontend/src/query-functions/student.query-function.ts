import { API_URL } from "src/utils/const/api";
import {
  getTokenAuthorizationHeader,
  getFormattedUrlEndpoint,
} from "./utils.query-function";

const endpoint = "/api/v0/students/";

export async function qfGetStudent(nim: string) {
  const student = await fetch(getFormattedUrlEndpoint(`${endpoint}/${nim}`), {
    method: "GET",
    headers: {
      ...getTokenAuthorizationHeader(),
    },
  });

  return await student.json();
}

export interface IQFPutStudent {
  birthDate: string;
}
export async function qfPutStudent(nim: string, body: IQFPutStudent) {
  const student = await fetch(getFormattedUrlEndpoint(`${endpoint}/${nim}`), {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      ...getTokenAuthorizationHeader(),
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
        ...getTokenAuthorizationHeader(),
      },
    }
  );

  return await studentReqLabs.json();
}

export interface IQFPostStudentReqLabs {
  labID: string;
  studentNIM: string;
}
export async function qfPostStudentReqLabs(
  nim: string,
  body: IQFPostStudentReqLabs
) {
  const studentReqLabs = await fetch(
    getFormattedUrlEndpoint(`${endpoint}/${nim}/reqlabs`),
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        ...getTokenAuthorizationHeader(),
      },
    }
  );

  return await studentReqLabs.json();
}

export interface IQFPutStudentReqLabs {
  labID: string;
}
export async function qfPutStudentReqLabs(
  nim: string,
  reqlabId: string,
  body: IQFPutStudentReqLabs
) {
  const studentReqLabs = await fetch(
    getFormattedUrlEndpoint(`${endpoint}/${nim}/reqlabs/${reqlabId}`),
    {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        ...getTokenAuthorizationHeader(),
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
        ...getTokenAuthorizationHeader(),
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
        ...getTokenAuthorizationHeader(),
      },
    }
  );

  return await studentThesis.json();
}

export interface IQFPostStudentThesis {
  title_1st: string;
  title_2nd: string;
  labID_1st: string;
  labID2_1st: string;
  lecturerPropose_1st?: string;
  labID_2nd: string;
  labID2_2nd: string;
  lecturerPropose_2nd?: string;
}
export async function qfPostStudentThesis() {
  const studentThesis = await fetch(
    getFormattedUrlEndpoint(`${endpoint}/${nim}/thesis`),
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        ...getTokenAuthorizationHeader(),
      },
    }
  );

  return await studentThesis.json();
}

export interface IQFPutStudentThesis {
  title_1st: string;
  title_2nd: string;
}
export async function qfPutStudentThesis(
  nim: string,
  thesisID: number,
  body: IQFPutStudentThesis
) {
  const studentThesis = await fetch(
    getFormattedUrlEndpoint(`${endpoint}/${nim}/thesis/${thesisID}`),
    {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        ...getTokenAuthorizationHeader(),
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
        ...getTokenAuthorizationHeader(),
      },
    }
  );

  return await studentThesis.json();
}
