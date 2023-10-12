export interface IPostTask {
  readonly classId: string;
  readonly name?: string;
  readonly attachments?: string[];
  readonly description?: string;
  readonly dueDate: number;
}

export interface IPostTaskSubmission {
  readonly description?: string;
  readonly taskId: string;
}

export interface IPutTurnInStatusTaskSubmission {
  readonly turnedIn: boolean;
}

export interface IPutTaskSubmission {
  readonly description?: string;
}
