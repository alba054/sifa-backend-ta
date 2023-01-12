import * as yup from "yup";

export interface IFESeminarScheduleValues {
  student: any;
  seminarType: string;
  seminarDate: Date;
  seminarTimeStart: Date;
  seminarTimeEnd: Date;
  offlinePlace: string;
  onlinePlace: string;
  notes: string;
}

export const feSeminarScheduleSchema = yup.object({
  student: yup.string().required("Tolong input mahasiswa"),
  seminarType: yup.string().required("Tolong input jenis seminar"),
  seminarDate: yup.string().required("Tolong input tanggal seminar"),
  seminarTimeStart: yup.string().required("Tolong input waktu pelaksanaan (awal) seminar"),
  seminarTimeEnd: yup.string().required("Tolong input waktu pelaksanaan (akhir) seminar"),
  offlinePlace: yup.string().required("Tolong input tempat (luring) seminar"),
  onlinePlace: yup.string().required("Tolong input tempat (daring) seminar"),
});
