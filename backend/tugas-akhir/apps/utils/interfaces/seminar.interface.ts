export interface ISeminarDocumentPost {
  doc: IDocumentPost[];
}

interface IDocumentPost {
  name: string;
  path: string;
}

export interface ISeminarSchedulePost {
  seminarDate: string;
  startTime: string;
  endTime: string;
  place: string;
  note?: string;
}
