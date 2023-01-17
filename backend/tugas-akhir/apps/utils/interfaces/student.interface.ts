export interface IStudent {
  nim: string;
  name: string;
  address?: string;
  birthPlace?: string;
  birthDate?: string;
  status?: string;
  email?: string;
  phone?: string;
  gender?: "L" | "P";
  educationStage?: "S1" | "S2" | "S3" | "Profesi_Apoteker";
  vocation?: number;
  academicTeacher?: number;
}

export interface IStudentUpdate {
  address?: string;
  birthPlace?: string;
  birthDate?: string | Date;
  email?: string;
  phone?: string;
  gender?: "L" | "P";
  // status?: string;
  // educationStage?: number;
  vocation?: number;
  // academicTeacher?: number;
}
