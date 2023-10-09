export interface IPostTask {
  readonly classId: string;
  readonly name?: string;
  readonly attachments?: string[];
  readonly description?: string;
  readonly dueDate: number;
}
