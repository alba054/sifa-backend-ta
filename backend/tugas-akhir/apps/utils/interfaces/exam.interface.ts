export interface IRequestExamDocumentPost {
  doc: IDocumentPost[];
}

interface IDocumentPost {
  name: string;
  path: string;
}
