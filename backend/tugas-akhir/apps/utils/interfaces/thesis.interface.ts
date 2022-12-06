// taId                                                   Int                 @id @default(autoincrement())
//   taMhsNim                                               String              @db.Char(12)
//   taJudul                                                String              @db.Text
//   // taStatusPmb                                            Int
//   // taStatusKep                                            Int
//   taLabId                                                Int?
//   taFile                                                 String?             @db.VarChar(255)
//   taCatatan                                              String?             @db.Text
//   taCatatanMhs                                           String?             @db.Text
//   taStatusSk                                             Int?
//   ref_permohonan_ref_permohonanTotugas_akhir_taStatusPmb StatusPermohonan    @default(Belum_Diproses)
//   ref_permohonan_ref_permohonanTotugas_akhir_taStatusKep StatusPermohonan    @default(Belum_Diproses)

export interface IThesis {
  studentNIM: string;
  title: string;
  labID?: number;
  KRSPath?: string;
  KHSPath?: string;
  lecturerPropose?: number;
  note?: string;
  thesisFile?: string;
  studentNote?: string;
  // thesisStatusPMB?: "Belum_Diproses" | "Diterima" | "Ditolak";
  // thesisStatusKEP?: "Belum_Diproses" | "Diterima" | "Ditolak";
  // proposalStatus?: "Belum_Diproses" | "Diterima" | "Ditolak";
}

export interface IThesisPost {
  data: IThesis[];
}
