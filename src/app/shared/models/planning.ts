import { User } from "./user";
import { PlanningEvent } from "./planning-event";
import { TimeSlot } from "./time-slot";

export interface Planning {
    name: string;
    startDate: Date;
    endDate: Date;
    members: Array<User>;
    events: Array<PlanningEvent>;
    timeSlots: Array<TimeSlot>;


}

export const createPlanning = (partialPlanning: Partial<Planning>):Planning =>{
    return Object.assign({}, fullPlanning(), partialPlanning);
}

export const fullPlanning = ():Planning =>{
    return{
        name:'',
        startDate: new Date(),
        endDate: new Date(),
        members:Array<User>(),
        events: Array<PlanningEvent>(),
        timeSlots: Array<TimeSlot>()
    } as Planning
}