import { PlanningEvent, fullPlanningEvent } from './planning-event';
import {CalendarEvent} from 'angular-calendar';

export interface TimeSlot {
  start: Date;
  end: Date;
  event: PlanningEvent;
  done: boolean;
}


export const createTimeSlots = (partialTimeSlot: Array<Partial<TimeSlot>>):Array<TimeSlot> =>{
  let timeslots = Array<TimeSlot>();
  partialTimeSlot.forEach((timeslot: Partial<TimeSlot>) => timeslots.push(createTimeSlot(timeslot)));
  return timeslots;
};

export const createTimeSlot = (partialTimeSlot: Partial<TimeSlot>):TimeSlot =>{
  return Object.assign(
    {},
    fullTimeSlot(),
    partialTimeSlot,
    { start: new Date(partialTimeSlot.start) },
    { end: new Date(partialTimeSlot.end) });
};

export const fullTimeSlot = ():TimeSlot =>{
  return{
    start: new Date(),
    end: new Date(),
    event: fullPlanningEvent(),
    done: false
  } as TimeSlot;
};

export const convertTimeSlotsToCalendarEvent = (timeslots: Array<TimeSlot>): Array<CalendarEvent> => {
  const calendarEvents = Array<CalendarEvent>();
  timeslots.forEach((timeslot: TimeSlot) => calendarEvents.push(convertTimeSlotToCalendarEvent(timeslot)));
  return calendarEvents;
};

export const convertTimeSlotToCalendarEvent = (timeslot: TimeSlot): CalendarEvent => {
  return Object.assign(
    {},
    timeslot,
    { color: { primary: timeslot.event.color, secondary: timeslot.event.color }},
    { title: timeslot.event.name },
    { resizable: { beforeStart: true, afterEnd: true }},
    { draggable: true },
    { actions: [
      {
        label: "<i class=\"fa fa-fw fa-times\"></i>"
      },
      {
        label: "<i class=\"fa fa-fw fa-pencil\"></i>"
      }
    ]}
) as CalendarEvent;
};
