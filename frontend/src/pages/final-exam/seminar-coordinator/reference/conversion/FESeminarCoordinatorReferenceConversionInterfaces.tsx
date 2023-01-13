import * as yup from "yup";

export interface IFESeminarCoordinatorConversionReferencesValues {
  rubric: string;
  scoreBottomThreshold: number;
}

export const feSeminarCoordinatorConversionReferencesSchema = yup.object({
  rubric: yup.string().required("Tolong input nilai huruf"),
  scoreBottomThreshold: yup.string().required("Tolong input batas bawah nilai"),
});
