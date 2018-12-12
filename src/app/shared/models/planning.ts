import {User} from './user';
import {createTask, createTasks, Task} from './task';
import {createTimeSlots, TimeSlot} from './time-slot';
import Timestamp = firebase.firestore.Timestamp;
import * as firebase from 'firebase';

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
  console.log("DaNI,"+new Date(partialPlanning.startDate));
  const obj = Object.assign(
    {},
    fullPlanning(),
    partialPlanning,
    {id: partialPlanning.id},
    {startDate: new Date(partialPlanning.startDate)},
    {endDate: new Date(partialPlanning.endDate)}
  ) as Planning;
  //console.log("DANI,"+obj.startDate.getFullYear());

  console.log('----- Planning created -----');
  console.log('----- creating tasks -----');
  const tasks = createTasks(obj.tasks);
  obj.tasks = tasks;
  console.log('----- tasks created -----');
  console.log('----- creating timeslots -----');
  const timeslots = createTimeSlots(obj.timeSlots, tasks);
  console.log('----- timeslots created : ' + obj.timeSlots);
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
