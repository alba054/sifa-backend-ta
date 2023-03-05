export interface ISeminarRefPost {
  type: "Seminar_Proposal" | "Seminar_Hasil" | "Ujian_Skripsi";
  name?: string;
  weight: number;
  min: number;
  max: number;
  status: string;
  scoringType:
    | "Kualitas_Rencana_Penelitian"
    | "Presentasi"
    | "Penguasaan_Materi"
    | "Kesesuaian_Pola_Penulisan_Ilmiah";
}
