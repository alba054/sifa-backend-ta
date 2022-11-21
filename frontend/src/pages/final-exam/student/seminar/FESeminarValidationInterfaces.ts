import * as yup from "yup";

export interface IFESeminarValidationFormValues {
  pelaporanPDDikti: File;
  buktiSPPUKT: File
  ijazahTerakhir: File;
  transkripNilai: File;
  pasFotoHitamPutih: File;
  pelaporanNilaiMK: File;
  daftarNilaiFisikMK: File;
}

export const feSeminarValidationFormSchema = yup.object({
  pelaporanPDDikti: yup.object({
    name: yup.string().required("Tolong input pelaporan PD-Dikti"),
  }),
  buktiSPPUKT: yup.object({
    name: yup.string().required("Tolong input bukti SPP / UKT"),
  }),
  ijazahTerakhir: yup.object({
    name: yup.string().required("Tolong input ijazah terakhir"),
  }),
  transkripNilai: yup.object({
    name: yup.string().required("Tolong input transkrip nilai"),
  }),
  pasFotoHitamPutih: yup.object({
    name: yup.string().required("Tolong input pas foto hitam putih"),
  }),
  pelaporanNilaiMK: yup.object({
    name: yup.string().required("Tolong input pelaporan nilai mata kuliah pada sistem APPS"),
  }),
  daftarNilaiFisikMK: yup.object({
    name: yup.string().required("Tolong input daftar nilai fisik mata kuliah pada sistem APPS"),
  })
});