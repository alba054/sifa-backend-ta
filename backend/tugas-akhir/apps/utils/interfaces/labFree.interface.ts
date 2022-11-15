export interface ILabFree {
  labFreeNumber?: number;
  studentNIM: string;
  labID: number;
  documentDate?: Date | string;
  year?: number;
  requestStatus?: "Belum_Diproses" | "Diterima" | "Ditolak";
}
