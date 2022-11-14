export interface ILecturer {
  name: string;
  nip: string;
  departmentID: number;
  prefixDegree?: string;
  postfixDegree?: string;
  birthPlace?: string;
  birthDate?: string | Date;
  address?: string;
  NIDN?: string;
  sertificationNumber?: string;
  expertise?: string;
  signature?: string;
  picture?: string;
  email: string;
  gender?: "L" | "P";
  employeeStatus:
    | "PNS"
    | "CPNS"
    | "Dosen_Tetap_Non_PNS"
    | "Dosen_Tidak_Tetap"
    | "Dosen_Eksternal";
}
