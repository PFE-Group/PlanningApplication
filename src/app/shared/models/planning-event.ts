export interface PlanningEvent {
    name: string;
    expectedHours: number;
    doneHours: number;
    color: string;
}

export const createPlanningEvent = (partialPlanningEvent: Partial<PlanningEvent>):PlanningEvent =>{
    return Object.assign({}, fullPlanningEvent(), partialPlanningEvent);
}
  
export const fullPlanningEvent = ():PlanningEvent =>{
    return{
        name: '',
        expectedHours: 0,
        doneHours: 0,
        color: ''
    } as PlanningEvent
}