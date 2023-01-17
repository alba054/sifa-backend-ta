import * as yup from "yup";

export interface IFESeminarCoordinatorReferencesValues {
  seminarType?: string;
  scoringType?: string;
  scoringName?: string;
  percentage?: number;
  scoringRangeStart?: number;
  scoringRangeEnd?: number;
  status?: string;
}

export const feSeminarCoordinatorReferencesSchema = yup.object({
  seminarType: yup.string().required("Tolong input jenis seminar"),
  scoringType: yup.string().required("Tolong input jenis skor"),
  scoringName: yup.string().required("Tolong input nama penilaian"),
  percentage: yup.string().required("Tolong input persentase penilaian"),
  scoringRangeStart: yup.string().required("Tolong input rentang nilai (awal)"),
  scoringRangeEnd: yup.string().required("Tolong input rentang nilai (akhir)"),
  status: yup.string().required("Tolong input status"),
});
