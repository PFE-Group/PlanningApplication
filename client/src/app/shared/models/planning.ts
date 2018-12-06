import { User } from "./user";

export class Planning {
    name: string;
    startDate: Date;
    endDate: Date;
    members: Array<User>;
    events: Array<Event>;
    timeSlots: Array<TimeSlot>;

    constructor(private n: string, private sd: Date, private ed: Date, private mb?: Array<User>, private ev?: Array<Event>){
        this.name = n;
        this.startDate = sd;
        this.endDate = ed;
        this.members = mb;
        this.events = ev;
        this.timeSlots = new Array<TimeSlot>();
    }

}