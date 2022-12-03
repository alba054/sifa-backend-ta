import * as yup from "yup";

export interface IFESeminarValidationFormValues {
  pelaporanPDDikti: File | null;
  buktiSPPUKT: File | null
  ijazahTerakhir: File | null;
  transkripNilai: File | null;
  pasFotoHitamPutih: File | null;
  pelaporanNilaiMK: File | null;
  daftarNilaiFisikMK: File | null;
}

export const feSeminarValidationFormSchema = yup.object({
  pelaporanPDDikti: yup.object({
    name: yup.string().required("Tolong input pelaporan PD-Dikti"),
  }).nullable(),
  buktiSPPUKT: yup.object({
    name: yup.string().required("Tolong input bukti SPP / UKT"),
  }).nullable(),
  ijazahTerakhir: yup.object({
    name: yup.string().required("Tolong input ijazah terakhir"),
  }).nullable(),
  transkripNilai: yup.object({
    name: yup.string().required("Tolong input transkrip nilai"),
  }).nullable(),
  pasFotoHitamPutih: yup.object({
    name: yup.string().required("Tolong input pas foto hitam putih"),
  }).nullable(),
  pelaporanNilaiMK: yup.object({
    name: yup.string().required("Tolong input pelaporan nilai mata kuliah pada sistem APPS"),
  }).nullable(),
  daftarNilaiFisikMK: yup.object({
    name: yup.string().required("Tolong input daftar nilai fisik mata kuliah pada sistem APPS"),
  }).nullable()
});