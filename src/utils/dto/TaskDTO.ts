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
