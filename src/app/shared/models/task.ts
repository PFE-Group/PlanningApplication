import {forEach} from '@angular/router/src/utils/collection';
import {createPlanning} from './planning';

export interface Task {
  name: string;
  hoursExpected: number;
  hoursRealised: number;
  color: string;
}

export const createTasks = (partialTasks: Array<Partial<Task>>): Array<Task> => {
  const tasks = Array<Task>();
  partialTasks.forEach((task: any) => tasks.push(createTask(task)));
  return tasks;
};

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
