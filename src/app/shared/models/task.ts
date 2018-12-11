export interface Task {
  name: string;
  hoursExpected: number;
  hoursRealised: number;
  color: string;
}

export const createTask = (partialTask: Partial<Task>): Task => {
  return Object.assign({}, fullTask(), partialTask);
};

export const fullTask = (): Task => {
  return {
    name: '',
    hoursExpected: 0,
    hoursRealised: 0,
    color: ''
  } as Task;
};
