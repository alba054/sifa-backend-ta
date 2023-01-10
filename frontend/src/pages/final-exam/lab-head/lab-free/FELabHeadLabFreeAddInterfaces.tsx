import * as yup from "yup";

export interface IFELabFreeAddFormValues {
  student: any;
}

export const feLabFreeAddFormSchema = yup.object({
  student: yup
    .string()
    .required("Tolong input mahasiswa pemohon bebas lab")
});
