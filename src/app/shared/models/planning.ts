import { User } from "./user";
import { PlanningEvent } from "./planning-event";
import {createTimeSlot, TimeSlot} from './time-slot';

export interface Planning {
  planningId: string;
  name: string;
  startDate: Date;
  endDate: Date;
  members: Array<User>;
  events: Array<PlanningEvent>;
  timeSlots: Array<TimeSlot>;
}

export const createPlannings = (partialPlannings: Array<Partial<Planning>>): Array<Planning> => {
  let plannings = Array<Planning>();
  partialPlannings.forEach((planning: Partial<Planning>) => plannings.push(createPlanning(planning)));
  return plannings;
};

export const createPlanning = (partialPlanning: Partial<Planning>): Planning => {
  const timeslots = Array<TimeSlot>();
  const obj = Object.assign(
    {},
    fullPlanning(),
    partialPlanning,
    { startDate: new Date(partialPlanning.startDate) },
    { endDate: new Date(partialPlanning.endDate) },
  ) as Planning;
  obj.timeSlots.forEach((timeslot: TimeSlot) => {
    timeslots.push(createTimeSlot(timeslot));
  });
  obj.timeSlots = timeslots;
  return obj;
};

export const fullPlanning = (): Planning =>{
  return{
    planningId: '',
    name: '',
    startDate: new Date(),
    endDate: new Date(),
    members:Array<User>(),
    events: Array<PlanningEvent>(),
    timeSlots: Array<TimeSlot>()
  } as Planning
};
