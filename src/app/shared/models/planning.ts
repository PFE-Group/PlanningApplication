import {User} from './user';
import {Task} from './task';
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
  const obj = Object.assign(
    {},
    fullPlanning(),
    partialPlanning,
    {startDate: new Date(partialPlanning.startDate._seconds)},
    {endDate: new Date(partialPlanning.endDate._seconds)}
  ) as Planning;
  console.log('Planning created');
  const timeslots = createTimeSlots(obj.timeSlots);
  console.log('timeslots created : ' + obj.timeSlots);
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
