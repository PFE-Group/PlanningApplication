import {User} from './user';
import {createTasks, Task} from './task';
import {createTimeSlots, TimeSlot} from './time-slot';

export interface Planning {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  users: Array<User>;
  tasks: Array<Task>;
  timeSlots: Array<TimeSlot>;
}

export const createPlannings = (partialPlannings: any[]): Array<Planning> => {
  const plannings = Array<Planning>();
  partialPlannings.forEach((planning: any) => plannings.push(createPlanning(planning)));
  return plannings;
};

export const createPlanning = (partialPlanning: any): Planning => {
  const obj = Object.assign(
    {},
    fullPlanning(),
    partialPlanning,
    {id: partialPlanning.id},
    {startDate: new Date(partialPlanning.startDate._seconds * 1000)},
    {endDate: new Date(partialPlanning.endDate._seconds * 1000)}
  ) as Planning;
  const tasks = createTasks(obj.tasks);
  obj.tasks = tasks;
  const timeslots = createTimeSlots(obj.timeSlots, tasks);
  obj.timeSlots = timeslots;
  return obj;
};

export const fullPlanning = (): Planning => {
  return {
    id: '',
    name: '',
    startDate: new Date(),
    endDate: new Date(),
    users: Array<User>(),
    tasks: Array<Task>(),
    timeSlots: Array<TimeSlot>()
  } as Planning;
};
