export interface IAddTask {
  onCancel(): void;
  isVisible: boolean;
  onSaveTask(newTask: any): void;
}
