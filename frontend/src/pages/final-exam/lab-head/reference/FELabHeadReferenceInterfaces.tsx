import * as yup from "yup";

export interface IFELabFreeAddReferenceValues {
  letterName: any;
  letterNumberFormat: string;
}

export const feLabFreeAddReferenceSchema = yup.object({
  letterName: yup.string().required("Tolong input nama surat"),
  letterNumberFormat: yup.string().required("Tolong input nomor surat"),
});
