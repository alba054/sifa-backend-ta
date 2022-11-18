import * as yup from "yup";

export interface IFESeminarFormValues {
  seminarType: any;
}

export const feSeminarFormSchema = yup.object({
  seminarType: yup
    .string()
    .required("Tolong input jenis seminar anda")
});
