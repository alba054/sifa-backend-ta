export interface IListTasksDTO {
  id: string;
  name: string;
  updatedAt: Date | string;
  dueDate: number;
}

export interface ITaskDetailDTO {
  id: string;
  name: string;
  updatedAt: Date | string;
  attachment: string[];
  description: string;
  dueDate: number;
}

export interface IListTaskSubmissionDTO {
  taskSubmissionId?: string;
  userId: string;
  studentName: string;
  turnInStatus: boolean;
}

export interface ITaskSubmissionDetailDTO {
  taskSubmissionId?: string;
  userId: string;
  studentName: string;
  turnInStatus: boolean;
  attachment: string[];
}
