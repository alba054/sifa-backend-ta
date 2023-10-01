export interface IPostClass {
  readonly name: string;
  readonly subjectId: string;
}

export interface IPutClass {
  readonly name?: string;
  readonly subjectId?: string;
}
