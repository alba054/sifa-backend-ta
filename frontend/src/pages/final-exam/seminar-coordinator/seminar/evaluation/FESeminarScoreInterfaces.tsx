import * as yup from "yup";

export interface IFESeminarScoreValues {
  score: number;
}

export const feSeminarScoreSchema = yup.object({
  score: yup.string().required("Tolong input nilai seminar mahasiswa"),
});
