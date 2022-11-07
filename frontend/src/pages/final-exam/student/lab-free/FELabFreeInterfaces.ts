import * as yup from "yup";

export interface IFELabFreeFormValues {
  laboratory: any;
}

export const feLabFreeFormSchema = yup.object({
  laboratory: yup
    .string()
    .required("Tolong input Laboratorium anda")
});
