import {User} from './user';
import {Task} from './task';
import {createTimeSlots, TimeSlot} from './time-slot';
import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export interface Planning {
  id: string;
  name: string;
  startDate: Timestamp;
  endDate: Timestamp;
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
    {startDate: new Date(partialPlanning.startDate)},
    {endDate: new Date(partialPlanning.endDate)}
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
    startDate: new Timestamp(0, 0),
    endDate: new Timestamp(0, 0),
    users: Array<User>(),
    tasks: Array<Task>(),
    timeSlots: Array<TimeSlot>()
  } as Planning;
};
