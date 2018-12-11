import {Task, fullTask} from './task';
import {CalendarEvent} from 'angular-calendar';
import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;
import {createPlanning} from './planning';

export interface TimeSlot {
  id: string;
  endHour: Timestamp;
  startHour: Timestamp;
  task: Task;
  done: boolean;
}

export const createTimeSlots = (partialTimeSlots: any[]): Array<TimeSlot> => {
  const timeSlots = Array<TimeSlot>();

  for (const pts in partialTimeSlots) {
    const ts = fullTimeSlot();
    ts.id = pts;
    ts.endHour = partialTimeSlots[pts].endHour;
    ts.startHour = partialTimeSlots[pts].startHour;
    ts.task = partialTimeSlots[pts].task;
    ts.done = partialTimeSlots[pts].done;
    timeSlots.push(createTimeSlot(ts));
  }
  console.log('timeslots created');
  return timeSlots;
};

export const createTimeSlot = (partialTimeSlot: any): TimeSlot => {
  return Object.assign(
    {},
    fullTimeSlot(),
    partialTimeSlot,
    {start: new Date(partialTimeSlot.start)},
    {end: new Date(partialTimeSlot.end)},
    {done: partialTimeSlot.done},
    {timeSlotId: partialTimeSlot});
};

export const fullTimeSlot = (): TimeSlot => {
  return {
    id: '',
    startHour: new Timestamp(0, 0),
    endHour: new Timestamp(0, 0),
    task: fullTask(),
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
    {color: {primary: timeslot.task.color, secondary: timeslot.task.color}},
    {title: timeslot.task.name},
    {resizable: {beforeStart: true, afterEnd: true}},
    {draggable: true},
    {
      actions: [
        {
          label: '<i class="fa fa-fw fa-times"></i>'
        },
        {
          label: '<i class="fa fa-fw fa-pencil"></i>'
        }
      ]
    }
  ) as CalendarEvent;
};
