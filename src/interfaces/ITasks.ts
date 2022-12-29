export interface ITasks {
  description: string;
  estimateAt: Date;
  doneAt: Date | null;
  toggleTask(id: number): void;
  id: number;
}

export interface ITasksValues {
  description: string;
  estimateAt: Date;
  doneAt: Date | null;
  id: number;
}
