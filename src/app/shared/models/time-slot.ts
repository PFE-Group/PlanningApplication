import { PlanningEvent, fullPlanningEvent } from './planning-event';

export interface TimeSlot {
    start : Date;
    end : Date;
    event : PlanningEvent;
    done : boolean;
}

export const createTimeSlot = (partialTimeSlot: Partial<TimeSlot>):TimeSlot =>{
    return Object.assign({}, fullTimeSlot(), partialTimeSlot);
}
  
export const fullTimeSlot = ():TimeSlot =>{
    return{
        start:new Date(),
        end: new Date(),
        event: fullPlanningEvent(),
        done: false
    } as TimeSlot
}