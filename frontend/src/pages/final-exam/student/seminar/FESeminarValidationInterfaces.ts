import * as yup from "yup";

export interface IFESeminarValidationFormValues {
  drafProposal: File | null;
  slidePresentasi: File | null
  skPembimbing: File | null;
  skPenguji: File | null;
  skAktifKuliah: File | null;
  krs: File | null;
  buktiTelahMenghadiriSeminarProposal: File | null;
}

export const feSeminarValidationFormSchema = yup.object({
  drafProposal: yup.object({
    name: yup.string().required("Tolong input Draf Proposal"),
  }).nullable(),
  slidePresentasi: yup.object({
    name: yup.string().required("Tolong input Slide Presentasi"),
  }).nullable(),
  skPembimbing: yup.object({
    name: yup.string().required("Tolong input SK Pembimbing"),
  }).nullable(),
  skPenguji: yup.object({
    name: yup.string().required("Tolong input SK Penguji"),
  }).nullable(),
  skAktifKuliah: yup.object({
    name: yup.string().required("Tolong input SK Aktif Kuliah"),
  }).nullable(),
  krs: yup.object({
    name: yup.string().required("Tolong input Kartu Rencana Studi"),
  }).nullable(),
  buktiTelahMenghadiriSeminarProposal: yup.object({
    name: yup.string().required("Tolong input Bukti telah menghadiri Seminar Proposal minimal 5 kali"),
  }).nullable()
});