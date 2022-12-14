import * as yup from "yup";

export interface IFETrialPermitFormValues {
  pelaporanPDDikti: File | null;
  buktiKlirinsSppUkt: File | null;
}

export const feTrialPermitFormSchema = yup.object({
  pelaporanPDDikti: yup
    .object({
      name: yup.string().required("Tolong input dokumen Pelaporan PD-Dikti"),
    })
    .nullable(),
  buktiKlirinsSppUkt: yup
    .object({
      name: yup.string().required("Tolong input dokumen Bukti Klirins SPP/UKT"),
    })
    .nullable(),
});
