export interface ISeminarDocumentPost {
  doc: IDocumentPost[];
}

interface IDocumentPost {
  name: string;
  path: string;
}

export interface ISeminarSchedulePost {
  seminarDate: number;
  startTime: number;
  endTime?: number;
  place: string;
  note?: string;
  groupID?: string;
  moderator: number;
}
