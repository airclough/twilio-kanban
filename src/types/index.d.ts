export enum Status {
  BACKLOG = 'BACKLOG',
  TO_DO = 'TO_DO',
  ONGOING = 'ONGOING',
  DONE = 'DONE',
}

export interface Task {
  description: string;
  name: string;
  status: Status;
}

export interface List {
  id: string;
  tasks: Task[];
}
